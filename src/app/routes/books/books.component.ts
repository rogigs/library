import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  Subject,
  catchError,
  map,
  switchMap,
  take,
  takeUntil,
  throwError,
} from 'rxjs';
import {
  DialogComponent,
  DialogData,
} from '../../components/dialog/dialog.component';
import { LibraryService } from '../../services/library/library.service';
import { AppMaterialModule } from '../../shared/app-material.module';
import { Book } from '../../types/book.types';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [AppMaterialModule, AsyncPipe, ReactiveFormsModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
  providers: [LibraryService],
})
export class BooksComponent implements OnInit {
  // TODO: add pagination
  // component pagination angular material
  // cache memory of books
  // visible books books.slice(pageSize * page, pageSize * page + pageSize )

  private router = inject(Router);
  private libraryService = inject(LibraryService);
  private dialog = inject(MatDialog);
  private ngUnsubscribe = new Subject<void>();

  books!: Omit<Book, 'category'>[];
  name: string = '';

  ngOnInit(): void {
    this.loadBooks();
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

  loadBooks(): void {
    this.libraryService
      .getAllBooks(1, 10)
      .pipe(
        take(1),
        map((response) => response.data.items as any),
        catchError((err) => {
          this.openDialog({
            title: 'error',
            content: 'Por favor, recarregue a página para tentar novamente.',
          });

          return throwError(() => err);
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((res) => {
        this.books = res;
      });
  }

  goToForm(id?: string): void {
    this.router.navigate(['/books/form'], {
      queryParams: id ? { id } : {},
    });
  }

  goToDetails(id: string): void {
    this.router.navigate([`/books/details/${id}`]);
  }

  deleteBook(id: string): void {
    this.libraryService
      .deleteBook(id)
      .pipe(
        take(1),
        switchMap(() => this.libraryService.getAllBooks(1, 10)),
        map((response) => response.data.items as any),
        takeUntil(this.ngUnsubscribe),
        catchError((err) => {
          this.openDialog({
            title: 'error',
            content: 'Por favor, tente novamente.',
          });

          return throwError(() => err);
        })
      )
      .subscribe((res) => {
        this.books = res;
      });
  }

  searchBook(): void {
    if (this.name) {
      this.libraryService
        .searchBook(this.name)
        .pipe(
          map((response: any) => response.data),
          catchError((err) => {
            this.openDialog({
              title: 'error',
              content: 'Por favor, tente novamente.',
            });

            return throwError(() => err);
          }),
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe((res) => {
          this.books = res;
        });

      return;
    }

    this.openDialog({
      title: 'warning',
      content: 'Por favor, insira o nome de um livro.',
    });
  }
}
