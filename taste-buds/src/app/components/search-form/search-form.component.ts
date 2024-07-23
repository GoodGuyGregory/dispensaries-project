import { Component, OnInit,} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { Location } from "@angular/common";
import { DispensaryService } from '../../services/dispensary.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CannabisService } from '../../services/cannabis.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent implements OnInit{
  
  public searchProduct: string;

  public categories: string[] = [];
  public states: string[] = [];
  public brands:string[] = [];
  public strainTypes: string[] = [];

  public searchForm =  this.fb.group({
    productName: ['',Validators.required],
    category: ['',Validators.required],
    searchRegion: ['', Validators.required],
    strainName: [''],
    strainType: [''],
    brand: ['']
  });
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private dispensaryService: DispensaryService,
    private cannabisService: CannabisService
  ) {

  }

  public ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      this.searchProduct = params.get('productName'); 
      this.searchForm.patchValue({productName: this.searchProduct});
    });
    // get the decision helper elements:
    let decisionHelped = history.state.decisionParams;
    if (decisionHelped) {
      console.log(decisionHelped);
      this.searchForm.patchValue({
        productName: decisionHelped.StrainName,
        strainName: decisionHelped.StrainName,
        strainType: decisionHelped.StrainType,
        category: decisionHelped.Category
      });
    }
    
    this.dispensaryService.getDispensaryRegions().subscribe((regions) => {
      this.states = regions;
    })

    this.dispensaryService.getProductCategories().subscribe((categories) => {
      this.categories = categories;
    })

    this.cannabisService.getStrainTypes().subscribe((types) => {
      this.strainTypes = types;
    })
  }

  public searchDispensaries() {

    const prodQuery = new Product(this.searchForm.get('productName').value,
                                  this.searchForm.get('category').value,
                                  this.searchForm.get('searchRegion').value,
                                  this.searchForm.get('strainName').value,
                                  this.searchForm.get('strainType').value,
                                  this.searchForm.get('brand').value); 
    this.dispensaryService.getDispensaryProducts(prodQuery);
    this.router.navigateByUrl("results");
  }

  public checkRegion() {
    return this.searchForm.get('searchRegion').value !== '';
  }

  public getDispensaryBrands(): void {
    this.dispensaryService.getDispensaryBrands(this.searchForm['state']).subscribe((brands) => {
      this.brands = brands;
    })
  }

  public goBack() {
    window.history.back();
  }


}
