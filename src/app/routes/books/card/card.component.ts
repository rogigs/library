import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
} from '../../../components/dialog/dialog.component';
import { LibraryService } from '../../../services/library/library.service';
import { NavigateService } from '../../../services/navigate/navigate.service';
import { AppMaterialModule } from '../../../shared/app-material.module';
import { Book } from '../../../types/book.types';

@Component({
  imports: [AppMaterialModule],
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  private dialog = inject(MatDialog);
  private libraryService = inject(LibraryService);
  private ngUnsubscribe = new Subject<void>();
  navigate = inject(NavigateService);

  @Input({ required: true }) book!: Omit<Book, 'category'>;

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  openDialog(data: DialogData): void {
    this.dialog.open(DialogComponent, {
      data,
    });
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
        // Hot and cold subscribes
        // this.books = res;
      });
  }
}
