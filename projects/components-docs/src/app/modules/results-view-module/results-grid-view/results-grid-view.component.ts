import { Component } from '@angular/core';
import { GridView } from '@sinequa/components/results-view';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-results-grid-view',
  templateUrl: './results-grid-view.component.html'
})
export class DocResultsGridViewComponent extends BaseComponent {

  gridView: GridView = {
    columns: [{
      active: true,
      title: 'ID',
      field: 'id',
      sortable: true,
      renderAsHtml: true
    },
    {
      active: true,
      title: 'Authors',
      field: 'sourcestr1',
      sortable: true,
      renderAsHtml: true
    }],
    name: 'name',
    type: 'type'
  };

  code = `<sq-results-grid-view
    [results]="results"
    [view]="gridView">
</sq-results-grid-view>`;

  code2 = `gridView: GridView = {
    columns: [{
        active: true,
        title: 'ID',
        field: 'id',
        sortable: true,
        renderAsHtml: true
    },
    {
        active: true,
        title: 'Authors',
        field: 'sourcestr1',
        sortable: true,
        renderAsHtml: true
    }],
    name: 'name',
    type: 'type'
};`;

}
