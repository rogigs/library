import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { DialogComponent } from '../../components/dialog/dialog.component';
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
  private ngUnsubscribe = new Subject<void>();
  books!: Omit<Book, 'category'>[];
  name: string = '';

  constructor(
    private router: Router,
    private libraryService: LibraryService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loadBooks(): void {
    this.libraryService
      .getAllBooks(1, 10)
      .pipe(
        map((response) => response.data.items as Omit<Book, 'category'>[]),
        catchError((err) => {
          this.dialog.open(DialogComponent, {
            data: {
              title: 'Error',
              content: 'Por favor, recarregue a página para tentar novamente.',
            },
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
        map((response) => response.data.items as Omit<Book, 'category'>[]),
        takeUntil(this.ngUnsubscribe),
        catchError((err) => {
          this.dialog.open(DialogComponent, {
            data: {
              title: 'Error',
              content: 'Por favor, tente novamente.',
            },
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
            this.dialog.open(DialogComponent, {
              data: {
                title: 'Error',
                content: 'Por favor, tente novamente.',
              },
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

    this.dialog.open(DialogComponent, {
      data: {
        title: 'Warning',
        content: 'Por favor, insira o nome de um livro.',
      },
    });
  }
}
