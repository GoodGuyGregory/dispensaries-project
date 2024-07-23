import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{

  public searchParameter: string;

  public searchForm = this.fb.group({
    searchParameter: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {

  }

  ngOnInit(): void {

  }

  public searchProduct() {
    this.router.navigateByUrl(`search-form/${this.searchForm.value['searchParameter']}`);
  }
}
