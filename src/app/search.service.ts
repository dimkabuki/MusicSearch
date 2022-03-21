import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

type SearchEntry = {
  collectionName: string;
};

type SearchResults = {
  resultCount: number;
  results: SearchEntry[];
};

const API_URL = 'https://itunes.apple.com/search';

export const DEFAULT_RESULT = ['A', 'B', 'C', 'D', 'E'];

function getSortedData(items: SearchResults['results']): string[] {
  return items.length
    ? items
        .map(({ collectionName }) => collectionName)
        .sort()
        .slice(0, 5)
    : [...DEFAULT_RESULT];
}

@Injectable()
export class SearchService {
  constructor(private http: HttpClient) {}

  search(query: Observable<string>, debounceMs = 600) {
    return query.pipe(
      debounceTime(debounceMs),
      distinctUntilChanged(),
      switchMap((term) => this.rawSearch(term))
    );
  }

  rawSearch(term: string) {
    const url = `${API_URL}?entity=album&term=${term}`;
    return this.http
      .jsonp<SearchResults>(url, 'callback')
      .pipe(map((response: SearchResults) => getSortedData(response?.results || [])));
  }
}
