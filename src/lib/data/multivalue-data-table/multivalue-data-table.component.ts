import { IMultivalueDataRow, IMultivalueDataRowConfig } from './multivalue-data-table.interface';
import { Component, OnInit, Input, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'spr-multivalue-data-table',
  templateUrl: './multivalue-data-table.component.html',
  styleUrls: ['./multivalue-data-table.component.scss']
})
export class MultivalueDataTableComponent implements OnInit, AfterViewInit {
  @Input() data: IMultivalueDataRow[];
  @Input() addBorder: boolean;
  @Input() addZebraStriping: boolean;
  @Input() addColFade: boolean;
  public headerText: string;
  public root: IMultivalueDataRow;
  public columnCount: number;
  @Input() public pinFirstColumn = true;
  @ViewChildren('valueCell') valueCells: QueryList<any>;
  @ViewChildren('labelCell') labelCells: QueryList<any>;

  constructor() { }

  ngOnInit() {
    if (this.data === undefined) {
       console.warn('No data was found. Please ensure you set the [data] attribute on the element.');
    } else {
      this.headerText = this.data[0].label;
      this.root = this.data[0];
      this.columnCount = this.getMaxColumnCount(this.root, 0);

      this.setLevels(this.root, 0);
    }
  }

  ngAfterViewInit() {
    if (this.pinFirstColumn) {
    const valueCellsArray = this.valueCells.toArray().map(x => x.nativeElement).filter( c => c.className.includes('firstValueCol'));
    const lableCellsArray = this.labelCells.toArray().map(x => x.nativeElement).filter( c => !c.className.includes('headerRow'));
    const offsetHeightMapping = lableCellsArray
                                    .map((x, idx) => (
                                      {labelHeight: x.offsetHeight, valueHeight: valueCellsArray[idx].offsetHeight}
                                    ) );
    offsetHeightMapping.forEach( (m, idx) => {
      if (m.labelHeight === m.valueHeight) {
        return;
      }

      if (m.labelHeight > m.valueHeight) {
        valueCellsArray[idx].height = m.labelHeight;
      } else {
        lableCellsArray[idx].height = m.valueHeight;
      }
    });
  }
  }

  public getValueClasses(nodeConfig: IMultivalueDataRowConfig, isFirstValueCol: boolean ): string {
    let classes = ['c-text-gray-9', 'spr-multivalue-data-table-value'];

    if (isFirstValueCol) {
      classes.push('firstValueCol');
    }

    if (this.addBorder)
      classes.push('c-bd');

    if (nodeConfig && nodeConfig.customValueClasses) {
      classes = classes.concat(nodeConfig.customValueClasses);
    }

    return classes.join(' ');
  }

  public getHeaderClasses(): string[] {
    let classes = ['spr-multivalue-data-table-header'];

    if (this.root.config && this.root.config.customHeaderClasses) {
      classes = classes.concat(this.root.config.customHeaderClasses);
    }

    return classes;
  }

  public getClonedHeaderClasses(): string[] {
    const classes = this.getHeaderClasses();
    if (this.addBorder)
      classes.push('c-bd-left');

    return classes;
  }
  private getMaxColumnCount(node: IMultivalueDataRow, currentMaxCount: number): number {
    let currentMax = currentMaxCount;

    if (node.values && node.values.length > currentMax) {
      currentMax = node.values.length;
    }

    _.forEach(node.children, (child: IMultivalueDataRow) => currentMax = this.getMaxColumnCount(child, currentMax));

    return currentMax;
  }

  private setLevels(node: IMultivalueDataRow, currentLevel: number) {
    node.level = currentLevel;
    _.forEach(node.children, (child: IMultivalueDataRow) => this.setLevels(child, currentLevel + 1));
  }

}
