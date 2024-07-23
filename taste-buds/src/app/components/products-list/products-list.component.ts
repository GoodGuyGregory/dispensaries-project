import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {
  
  @Input()
  public foundProducts: Product[];

  public dataSource: MatTableDataSource<Product>;

  public displayedColumns = ['Select', 'Name','StrainName','StrainType',
    'BrandName','Category','DispensaryName', 'State', 
    'DispensaryRating','Price','UnitSize',];
    public selection = new SelectionModel<Product>(false, []);    

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Product>();
  }
  ngOnInit() {
    if (this.foundProducts) {
      this.dataSource.data = this.foundProducts;
    }
  }

  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['foundProducts'] && changes['foundProducts'].currentValue) {
      this.dataSource.data = this.foundProducts;
    }
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  
  }

  public toggleSelection(row: Product) {
    this.selection.clear(); 
    this.selection.toggle(row); 
  }

  public showDetails() {
    // console.log(this.selection.selected);
    this.dialog.open(ProductDialogComponent, {
      width: '1500px',
      height: '750px',
      autoFocus: true,
      data: this.selection.selected[0]
    });


  }


  
}
