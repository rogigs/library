import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, exhaustMap, filter } from 'rxjs';
import {
  DialogComponent,
  DialogData,
} from '../../components/dialog/dialog.component';
import { LibraryService } from '../../services/library/library.service';
import { AppMaterialModule } from '../../shared/app-material.module';
import { bookActions } from '../../store/actions/book.action';
import { bookSelector } from '../../store/selectors/book.selector';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [AppMaterialModule, AsyncPipe, ReactiveFormsModule, CardComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
  providers: [LibraryService],
})
export class BooksComponent implements OnInit {
  // TODO: add pagination
  // component pagination angular material
  // cache memory of books
  // visible books books.slice(pageSize * page, pageSize * page + pageSize )

  private dialog = inject(MatDialog);
  private libraryService = inject(LibraryService);
  private ngUnsubscribe = new Subject<void>();

  store = inject(Store);
  books$ = this.store.select(bookSelector);
  search = new FormControl('');

  ngOnInit(): void {
    this.store.dispatch(bookActions.getBooks());
  }

  constructor() {
    this.search.valueChanges
      .pipe(
        filter((value) => !!value),
        exhaustMap((value) => this.libraryService.searchBook(value as string))
      )
      .subscribe((response) => {
        this.store.dispatch(bookActions.searchBooks(response));
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  openDialog(data: DialogData): void {
    this.dialog.open(DialogComponent, {
      data,
    });
  }
}
