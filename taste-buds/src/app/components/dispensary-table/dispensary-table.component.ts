import { Component, Input, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Dispensary } from '../../models/Dispensary';
import { SelectionModel } from '@angular/cdk/collections';
import { DispensaryDialogComponent } from '../dispensary-dialog/dispensary-dialog.component';

@Component({
  selector: 'app-dispensary-table',
  templateUrl: './dispensary-table.component.html',
  styleUrl: './dispensary-table.component.scss'
})
export class DispensaryTableComponent implements OnInit {

  @Input()
  public foundDispensaries: Dispensary[];

  public dataSource: MatTableDataSource<Dispensary>;

  public displayColumns = ['Select','Name','Rating','Phone', 'Address1',
                            'City', 'PostalCode', 'Region'];
  public selection = new SelectionModel<Dispensary>(false, []);

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog
  ){
    this.dataSource = new MatTableDataSource<Dispensary>();
  }

  public ngOnInit(): void {
    if (this.foundDispensaries) {
      this.dataSource.data = this.foundDispensaries;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['foundDispensaries'] && changes['foundDispensaries'].currentValue) {
      this.dataSource.data = this.foundDispensaries;
    }
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  public toggleSelection(row: Dispensary) {
    this.selection.clear(); 
    this.selection.toggle(row); 
  }

  public showDetails() {
    this.dialog.open(DispensaryDialogComponent, {
      width: '1500px',
      height: '750px',
      autoFocus: true,
      data: this.selection.selected[0]
    });
  }

}
