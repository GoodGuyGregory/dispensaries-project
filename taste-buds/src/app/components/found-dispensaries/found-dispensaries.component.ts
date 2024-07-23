import { Component, OnInit } from '@angular/core';
import { DispensaryService } from '../../services/dispensary.service';
import { Product } from '../../models/product';
import { Dispensary } from '../../models/Dispensary';

@Component({
  selector: 'app-found-dispensaries',
  templateUrl: './found-dispensaries.component.html',
  styleUrl: './found-dispensaries.component.scss'
})
export class FoundDispensariesComponent implements OnInit{

  public foundProducts: Product[];
  public foundDispensaries: Dispensary[];

  public loading: boolean = false;

  constructor(
    private dispensaryService: DispensaryService
  ) {

  }
  public ngOnInit(): void {
    this.loading = true;
    this.dispensaryService._currentProducts.subscribe((products) => { 
      this.foundProducts = products;

      if (products.length > 0) {
        this.dispensaryService.getDispensariesById(this.getDispensaryIdsPerProduct(this.foundProducts)).subscribe(dispensaries => {
          this.foundDispensaries = dispensaries;
      });
    }
    });
  
    this.loading = false;


  }

  public getDispensaryIdsPerProduct(products: Product[]): string[] {
    let dispensaryIds = new Set<string>();
    for (let product of products) {
      dispensaryIds.add(product.DispensaryId);
    }
    let uniqueDispensaryIds = Array.from(dispensaryIds);
    return uniqueDispensaryIds;
  }

}
