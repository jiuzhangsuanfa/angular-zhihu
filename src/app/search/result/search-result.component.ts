import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchResult } from '../interfaces';
import { HistoryService } from '../service/history.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  value: string;

  results?: SearchResult[];

  status = {
    loading: false,
  };

  constructor(
    private history: HistoryService,
    private route: ActivatedRoute,
  ) {
    this.value = route.snapshot.params.keyword;
  }

  ngOnInit() { }

  search(keyword: string) {
    this.history.insert(keyword);
  }

  loadMore() {
    // const { resource, id } = new Link(location.href);
    // if (this.status.loading || resource !== ResourceType.QUESTION || id !== undefined || this.results === undefined) {
    //   return;
    // }
    // this.status.loading = true;
    // this.api.getQuestions(this.results.length > 0 && this.results[this.results.length - 1].id || undefined)
    //   .pipe(finalize(() => this.status.loading = false))
    //   .subscribe(results => this.results ? this.results.push(...results) : this.results = results);
  }

  trackByID(index: number, result: SearchResult) {
    return result.id;
  }

}
