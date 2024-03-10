import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs';
import { LibraryService } from '../../services/library/library.service';
import { bookActions } from '../actions/book.action';

export const bookEffect = createEffect(
  (actions$ = inject(Actions), libraryService = inject(LibraryService)) => {
    return actions$.pipe(
      ofType(bookActions.getBooks),
      tap(() => console.log('Passou pelo effect')),
      switchMap(() =>
        libraryService
          .getAllBooks(1, 10)
          .pipe(
            map((books) => bookActions.getBooksSuccess({ data: books.data }))
          )
      )
    );
  },
  { functional: true }
);
