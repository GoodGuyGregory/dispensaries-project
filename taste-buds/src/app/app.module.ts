import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// material modules:
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { DecisionHelperComponent } from './components/decision-helper/decision-helper.component';
import {MatSelectModule} from '@angular/material/select'; 
import {MatSliderModule} from '@angular/material/slider'; 
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatCardModule} from '@angular/material/card'; 

// forms module:
import { ReactiveFormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';

// http client module:
import { HttpClientModule } from '@angular/common/http';
import { FoundDispensariesComponent } from './components/found-dispensaries/found-dispensaries.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { DispensaryTableComponent } from './components/dispensary-table/dispensary-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    DecisionHelperComponent,
    FoundDispensariesComponent,
    SearchFormComponent,
    ProductsListComponent,
    DispensaryTableComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule, 
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    MatPaginatorModule,
    MatCardModule,
    MatTabsModule,
    MatSortModule,
    HttpClientModule
    
    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
