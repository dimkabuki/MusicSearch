import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DEFAULT_RESULT, SearchService } from './search.service';

const ROTATE_INTERVAL = 1000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  queryText = '';
  items: string[] = [...DEFAULT_RESULT];
  nextItems: string[] = [];
  query$ = new Subject<string>();
  timer = 0;

  constructor(private service: SearchService) {}

  ngOnInit() {
    this.service.search(this.query$).subscribe((results) => (this.nextItems = results));
    this.timer = setInterval(() => this.rotate(), ROTATE_INTERVAL);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  onClear() {
    this.queryText = '';
    this.items = [...DEFAULT_RESULT];
    this.nextItems = [];
  }

  rotate() {
    const tail = this.nextItems.length ? (this.nextItems.shift() as string) : this.items[0];
    this.items.shift();
    this.items.push(tail);
  }
}
