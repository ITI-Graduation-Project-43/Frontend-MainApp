import { Component, OnInit } from '@angular/core';
import { countries } from '../../Helper/helpers';

const COUNTRY_LIST = countries;

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  countries:string[] = COUNTRY_LIST;

  ngOnInit(): void {
    this.initPage();
  }

  initPage() {
  }
}

