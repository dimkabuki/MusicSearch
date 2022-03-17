import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

// for test purposes
const MOCKED_RESULT = [
  ['A Moon Shaped Pool (R)', 'In Rainbows (R)', 'Kid A (R)', 'OK Computer (R)', 'Pablo Honey (R)'],
  ['Surfer Rosa (P)', 'Doolittle (P)', 'Bossanova (P)', 'Trompe le Monde (P)', 'Indie Cindy (P)'],
  ['Showbiz (M)', 'Origin of Symmetry (M)', 'Absolution (M)', 'Black Holes and Revelations (M)', 'The Resistance (M)'],
  ['Loud Like Love (Pl)', 'Placebo (Pl)', 'Sleeping with Ghosts (Pl)', 'Meds (Pl)', 'Battle for the Sun (Pl)'],
  ['One Hot Minute (Rh)', 'Californication (Rh)', 'By the Way (Rh)', 'Stadium Arcadium (Rh)', 'I’m with You (Rh)'],
];

function getRandomResult<T>(list: T[] = []): T {
  return list[Math.floor(Math.random() * list.length)];
}
// for test purposes

export const DEFAULT_RESULT = ['A', 'B', 'C', 'D', 'E'];

@Injectable()
export class SearchService {
  search(query: Observable<string>, debounceMs = 400) {
    return query.pipe(
      debounceTime(debounceMs),
      distinctUntilChanged(),
      switchMap((term) => this.rawSearch(term))
    );
  }

  rawSearch(term: string) {
    console.log('Searching for: ', term);
    // Mocking search result from Apple Music API
    return of(getRandomResult(MOCKED_RESULT).sort());
  }
}
