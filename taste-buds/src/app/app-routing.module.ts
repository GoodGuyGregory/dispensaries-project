import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DecisionHelperComponent } from './components/decision-helper/decision-helper.component';
import { FoundDispensariesComponent } from './components/found-dispensaries/found-dispensaries.component';
import { SearchFormComponent } from './components/search-form/search-form.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'decision-helper', component: DecisionHelperComponent},
  {path: 'results', component: FoundDispensariesComponent},
  {path: 'search-form', component: SearchFormComponent},
  {path: 'search-form/:productName', component: SearchFormComponent},
  {
    path: "**",
    redirectTo: '/'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
