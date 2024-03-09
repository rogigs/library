import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, catchError, map, take, takeUntil, throwError } from 'rxjs';
import {
  DialogComponent,
  DialogData,
} from '../../../components/dialog/dialog.component';
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
  private location = inject(Location);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private libraryService = inject(LibraryService);
  public dialog = inject(MatDialog);
  private ngUnsubscribe = new Subject<void>();

  details!: Book;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.libraryService
        .getOneBook(params.get('id') as string)
        .pipe(
          take(1),
          map((response) => response.data),
          takeUntil(this.ngUnsubscribe),
          catchError((err) => {
            this.openDialog({
              title: 'error',
              content: 'Por favor, recarregue a página.',
            });

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

  openDialog(data: DialogData): void {
    this.dialog.open(DialogComponent, {
      data,
    });
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
          this.openDialog({
            title: 'error',
            content: 'Por favor, tente novamente.',
          });

          return throwError(() => err);
        })
      )
      .subscribe(() => {
        this.openDialog({
          title: 'success',
          content: 'O livro foi deletado com sucesso.',
        });
      });
  }
}
