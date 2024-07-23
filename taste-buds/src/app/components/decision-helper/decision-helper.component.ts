import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Cannabis } from '../../models/cannabis';
import { CannabisService } from '../../services/cannabis.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { SearchCriteria } from '../../models/seachCriteria';
import {SelectionModel} from "@angular/cdk/collections";
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-decision-helper',
  templateUrl: './decision-helper.component.html',
  styleUrl: './decision-helper.component.scss'
})
export class DecisionHelperComponent implements OnInit{

  // spinner
  public loading: boolean = false;
  public noResults: boolean = true;

  // searching
  public searching: boolean = false;

  // mat select fields:
  public flavorOptions: String[] = [];
  public strainTypes: String[] = [];
  public strainEffects: String[] = [];

  public searchOptions: Cannabis[] = [];
  public dataSource = new MatTableDataSource<Cannabis>(this.searchOptions);
  public displayedColumns = ['Select','Strain', 'Description', 'Type', 'Rating', 'Flavor','Effects'];
  public selection = new SelectionModel<Cannabis>(false, []);

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public decisionForm = this.fb.group({
    effectChoice: ['', Validators.required],
    strainType: ['', Validators.required],
    flavor: ['', Validators.required],
    rating: [3.0, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cannabisService: CannabisService
  ) {

  }

  public ngOnInit(): void {
     // get strain options:
    this.cannabisService.getStrainTypes().subscribe((types) => {
      this.strainTypes = types;
    })

    // gets possible strain flavors:
    this.cannabisService.getStrainFlavors().subscribe((flavors) => {
      this.flavorOptions = flavors;
    });
    
    // gets possible strain flavors:
    this.cannabisService.getStrainEffects().subscribe((effects) => {
      this.strainEffects = effects;
    });
  }

  public toggleSelection(row: Cannabis) {
    this.selection.clear(); 
    this.selection.toggle(row); 
  }

  public searchCannabis(): void {
    this.loading = true;
    this.searching = true;
    let searchCriteria = new SearchCriteria(
                                this.decisionForm.value['effectChoice'], 
                                this.decisionForm.value['flavor'], 
                                this.decisionForm.value['rating'], 
                                this.decisionForm.value['strainType'] 
                              );
                        
    this.cannabisService.getStrainSearch(searchCriteria).subscribe((searchResults) => {
        
        this.searchOptions = searchResults;
        this.dataSource.data = searchResults;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        if (searchResults.length > 0) {
          this.noResults = false;
        }
        else {
          this.noResults = true;
        }
      
      this.loading = false;
    });
  }

  public navigateToSearchForm() {
    // build the router object with strain parameters
    let decisionParams = {
      StrainName: this.selection.selected[0].Strain,
      Category: 'Flower',
      StrainType: this.selection.selected[0].Type
    };
    // pass the state of the helper component
    this.router.navigate(['search-form/'], {
      state: {decisionParams}
    });

  }


}
