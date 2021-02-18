import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { STORAGE_KEY_SEARCH_HISTORY } from '../constants';

@Component({
  selector: 'app-search-home',
  templateUrl: './search-home.component.html',
  styleUrls: ['./search-home.component.scss']
})
export class SearchHomeComponent implements OnInit {

  list?: string[];
  storage = localStorage;
  value: string = '';

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    const origin = JSON.parse(this.storage.getItem(STORAGE_KEY_SEARCH_HISTORY) || '[]');
    this.list = Array.from(new Set(origin));
  }

  search(keyword: string) {
    this.delete(keyword);
    this.list?.unshift(keyword);
    this.storage.setItem(STORAGE_KEY_SEARCH_HISTORY, JSON.stringify(this.list || []));
    this.router.navigate(['search', keyword]);
  }

  delete(keyword: string) {
    this.list = this.list?.filter(value => value !== keyword) || [];
  }

}
