import { Component, Input, OnChanges, HostBinding } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import { Record } from "@sinequa/core/web-services";
import { LabelsService } from "./labels.service";
import { AppService } from "@sinequa/core/app-utils";

@Component({
    selector: "sq-labels",
    // We need the two spans to get whitespace between each label
    // change size by adding h1-6 class to .sq-label div (default is h5)
    templateUrl: "./labels.component.html",
    styles: [
        `
            .input-autocomplete {
                display: flex;
                flex-direction: column;
            }
            .sq-label-group {
                display: inline-block;
                &:not(:last-child) {
                    margin-right: $spacer / 4;
                }
            }
            .sq-label {
                display: inline;
                margin-bottom: $spacer / 8;
            }
            .sq-labels-public {
                background-color: #4fc3f7;
                position: relative;
                overflow: hidden;
                cursor: pointer;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                -webkit-tap-highlight-color: transparent;
                color: #fff;
            }
            .sq-labels-private {
                background-color: #7283a7;
                position: relative;
                overflow: hidden;
                cursor: pointer;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                -webkit-tap-highlight-color: transparent;
                color: #fff;
            }
            .sq-label-remove {
                margin-left: $spacer / 16;
            }
            .chip {
                display: inline-block;
                height: 20px;
                padding: 0 6px;
                margin-right: 0.5rem;
                margin-top: 5px;
                font-size: 13px;
                font-weight: 500;
                line-height: 18px;
                cursor: pointer;
                border-radius: 16px;
                -webkit-transition: all 0.3s linear;
                transition: all 0.3s linear;
            }
            .clickable {
                cursor: pointer;
            }
            .clickable:hover {
                opacity: 85%;
            }
        `,
    ],
})
export class Labels implements OnChanges {
    @Input() record: Record;
    @Input() public: boolean;
    @Input() enableDelete: boolean = false; /** Display the delete button in the label tag */

    protected labelsField: string;
    showLabels: boolean;
    labels: string[];

    @HostBinding("class") hostClasses;

    constructor(
        private appService: AppService,
        private labelsService: LabelsService
    ) {}

    ngOnChanges() {
        const field = this.public
            ? this.labelsService.publicLabelsField
            : this.labelsService.privateLabelsField;
        this.labelsField = this.appService.resolveColumnAlias(field);
        this.showLabels = !!this.labelsField;
        this.makeLabels();
    }

    private makeLabels() {
        if (!this.showLabels) {
            this.labels = [];
            return;
        }
        const labels = this.record[this.labelsField];
        if (Utils.isArray(labels)) {
            this.labels = this.labelsService.sort(labels.slice(), this.public);
        } else {
            this.labels = [];
        }
    }

    select(label: string) {
        if (!this.public) {
            label = <string>this.labelsService.removePrivatePrefix(label);
        }
        this.labelsService.selectLabels([label], this.public);
    }

    remove(index: number) {
        if (this.canRemove()) {
            let label = this.labels[index];
            if (!this.public) {
                label = <string>this.labelsService.removePrivatePrefix(label);
            }
            this.labelsService.removeLabels(
                [label],
                [this.record.id],
                this.public
            );
        }
    }

    canRemove(): boolean {
        return this.public
            ? this.enableDelete &&
                this.labelsService.allowPublicLabelsManagement &&
                this.labelsService.userLabelsRights &&
                this.labelsService.userLabelsRights.canManagePublicLabels
            : this.enableDelete && true;
    }
}
