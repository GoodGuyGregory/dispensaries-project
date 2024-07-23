import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cannabis } from '../models/cannabis';
import { SearchCriteria } from '../models/seachCriteria';

@Injectable({
  providedIn: 'root'
})
export class CannabisService {


  private apiUrl = "http://localhost:5003/strains/";

  constructor(
    private httpClient: HttpClient
  ) { }

  // get strain flavors:
  public getStrainFlavors(): Observable<string[]> {
    let flavorsUrl = this.apiUrl + "getAllFlavors";
    return this.httpClient.get<string[]>(flavorsUrl);
  }

  // get strain types:
  public getStrainTypes(): Observable<string[]> {
    let strainTypesUrl  = this.apiUrl + "getAllTypes";
    return this.httpClient.get<string[]>(strainTypesUrl);
  }

  // get possible effects:
  public getStrainEffects(): Observable<string[]> {
    let strainEffectsUrl  = this.apiUrl + "getAllEffects";
    return this.httpClient.get<string[]>(strainEffectsUrl);
  }

  public getStrainSearch(seachCriteria: SearchCriteria): Observable<Cannabis[]> {
    let strainSearchUrl = this.apiUrl + "getStrainsByEffectFlavor/";
    return this.httpClient.post<Cannabis[]>(strainSearchUrl, seachCriteria);

  }

}
