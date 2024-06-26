import { Component, Input } from "@angular/core";

import { trigger, state, style, transition, animate } from "@angular/animations";

import { NonAclRecord } from "./incyte.types";

import { UIService } from '@sinequa/components/utils';

import { HelpFolderOptions } from "@sinequa/components/user-settings";


@Component({
    selector: "no-access-results",
    templateUrl: "./no-access-results.html",
    styleUrls: ['./no-access-results.scss'],
    animations: [
        trigger('expandCollapse', [
          state('expanded', style({
            height: '*',
            opacity: 1,
            display: 'block'
          })),
          state('collapsed', style({
            height: '0px',
            opacity: 0,
            display: 'none'
          })),
          transition('expanded <=> collapsed', [
            animate('300ms ease-in-out')
          ])
        ]),
        trigger('fadeIn', [
          state('visible', style({
            opacity: 1
          })),
          state('hidden', style({
            opacity: 0
          })),
          transition('hidden => visible', [
            animate('300ms ease-in') // 300ms delay
          ])
        ])
      ]
})
export class NoAccessResults{
  @Input() nonAclRecords: NonAclRecord[] = [];

  isExpanded = false;

  constructor(
    public readonly ui: UIService
  ){}

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  truncateFilename(input: string, maxLength: number): string {
    const dotIndex = input.lastIndexOf('.');
    if (dotIndex === -1 || dotIndex === 0) {
      return input.length > maxLength ? input.slice(0, maxLength) + '(..)' : input;
    }

    const name = input.slice(0, dotIndex);
    const extension = input.slice(dotIndex);

    if (name.length > maxLength) {
      return name.slice(0, maxLength) + '(..)' + extension;
    }

    return input;
  }

  truncateTreepath(input: string, maxLength: number): string {
    // Remove the first and last characters if they are '/'
    let trimmed = input;
    if (input.startsWith('/')) {
        trimmed = trimmed.substring(1);
    }
    if (input.endsWith('/')) {
        trimmed = trimmed.substring(0, trimmed.length - 1);
    }

    const truncationIndicator = "(..)";
    const truncationIndicatorLength = truncationIndicator.length;

    // Truncate the string if necessary and add the truncation indicator
    if (trimmed.length > maxLength) {
        trimmed = trimmed.substring(0, maxLength - truncationIndicatorLength) + truncationIndicator;
    }

    return trimmed;
}

  copyToClipboard(record: NonAclRecord, event: Event) {
    event.stopPropagation();
    let contentToCopy = `File name: ${record.filename}\n${record.authors ? `Author: ${record.authors}\n` : ''}File location: ${record.treePath}`
    this.ui.copyToClipboard(contentToCopy);
  }

  public helpFolderOptions: HelpFolderOptions = {
    path: '/r/Incyte_Help',
    indexFile: 'olh-search.html#iris-security',
  }
}
