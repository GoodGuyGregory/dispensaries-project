import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, Subject, tap } from 'rxjs';
import { Product } from '../models/product';
import { Dispensary } from '../models/Dispensary';

@Injectable({
  providedIn: 'root'
})
export class DispensaryService {

  private apiUrl = "http://localhost:5003/dispensaries/" 

  public _productList = new Subject<Product[]>();

  public _currentProducts = this._productList.asObservable();

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  // finds all categories:
  public getProductCategories(): Observable<string[]> {
    let categoriesUrl = this.apiUrl + "categories";
    return this.httpClient.get<string[]>(categoriesUrl);
  }

  // finds all regions:
  public getDispensaryRegions(): Observable<string[]> {
    let regionsUrl = this.apiUrl + "regions";
    return this.httpClient.get<string[]>(regionsUrl);
  }

  public getDispensaryBrands(region: string): Observable<string[]> {
    let brandsUrl = this.apiUrl + "brands/" + region;
    return this.httpClient.get<string[]>(brandsUrl);
  }

  public getDispensaryProducts(product: Product): void{
    let productQueryUrl = this.apiUrl + "find_product_from_dispensaries"
    this.httpClient.post<Product[]>(productQueryUrl, product, this.httpOptions)
    .pipe(
      tap((products) => this._productList.next(products)),
      catchError((err) => {
        console.error(err);
        throw err
      })
    ).subscribe();
  }

  public getDispensariesById(dispensaryIds: string[]): Observable<Dispensary[]> {
    let dispensaryUrl = this.apiUrl + "find_dispensaries";
    return this.httpClient.post<Dispensary[]>(dispensaryUrl, JSON.stringify(dispensaryIds), this.httpOptions);
  }

}
