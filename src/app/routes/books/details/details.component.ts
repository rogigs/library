import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, catchError, map, take, takeUntil, throwError } from 'rxjs';
import { LibraryService } from '../../../services/library/library.service';
import { AppMaterialModule } from '../../../shared/app-material.module';
import { Book } from '../../../types/book.types';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private ngUnsubscribe = new Subject<void>();
  details!: Book;

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private libraryService: LibraryService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.libraryService
        .getOneBook(params.get('id') as string)
        .pipe(
          take(1),
          map((response) => response.data),
          takeUntil(this.ngUnsubscribe),
          catchError((err) => {
            console.error('caught mapping error and rethrowing', err);

            return throwError(() => err);
          })
        )
        .subscribe((res) => {
          this.details = res;
        });
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  goBackToPrevPage(): void {
    this.location.back();
  }

  goToForm(id: string): void {
    this.router.navigate(['/books/form'], {
      queryParams: { id },
    });
  }

  deleteBook(): void {
    this.libraryService
      .deleteBook(this.details.id)
      .pipe(
        take(1),
        takeUntil(this.ngUnsubscribe),
        catchError((err) => {
          console.error('caught mapping error and rethrowing', err);

          return throwError(() => err);
        })
      )
      .subscribe();
  }
}
