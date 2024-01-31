import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, catchError, map, take, takeUntil, throwError } from 'rxjs';
import {
  DialogComponent,
  DialogData,
} from '../../../components/dialog/dialog.component';
import { LibraryService } from '../../../services/library/library.service';
import { AppMaterialModule } from '../../../shared/app-material.module';
import { Book, BookForm } from '../../../types/book.types';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [AppMaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  providers: [LibraryService],
})
export class FormComponent {
  private ngUnsubscribe = new Subject<void>();

  idBook: string | null = null;
  bookForm = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    author: new FormControl('', [Validators.required, Validators.minLength(4)]),
    publisher: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(500),
    ]),
    language: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    image: new FormGroup({
      id: new FormControl(''),
      src: new FormControl('', [Validators.required]),
      alt: new FormControl('', [Validators.required]),
    }),
  });

  // TODO: get languages of server
  languages = [
    { value: '0bb8bfec-9a27-4f9b-bcdc-c40a074eb31a', viewValue: 'Inglês' },
    { value: '0bb8bfec-9a27-4f9b-bcdc-c40a074eb31a', viewValue: 'Espanhol' },
    { value: '0bb8bfec-9a27-4f9b-bcdc-c40a074eb31a', viewValue: 'Português' },
    { value: '0bb8bfec-9a27-4f9b-bcdc-c40a074eb31a', viewValue: 'Francês' },
    { value: '0bb8bfec-9a27-4f9b-bcdc-c40a074eb31a', viewValue: 'Alemão' },
    { value: '0bb8bfec-9a27-4f9b-bcdc-c40a074eb31a', viewValue: 'Italiano' },
    { value: '0bb8bfec-9a27-4f9b-bcdc-c40a074eb31a', viewValue: 'Japonês' },
  ];
  // TODO: get categories of server
  categories = [
    { value: '0bb8bfec-9a27-4f9b-bcdc-c40a074eb31a', viewValue: 'Ficção' },
    { value: '0bb8bfec-9a27-4f9b-bcdc-c40a074eb31a', viewValue: 'Não Ficção' },
    { value: '0bb8bfec-9a27-4f9b-bcdc-c40a074eb31a', viewValue: 'Mistério' },
    { value: '0bb8bfec-9a27-4f9b-bcdc-c40a074eb31a', viewValue: 'Romance' },
    { value: '0bb8bfec-9a27-4f9b-bcdc-c40a074eb31a', viewValue: 'Fantasia' },
    {
      value: '0bb8bfec-9a27-4f9b-bcdc-c40a074eb31a',
      viewValue: 'Ficção Científica',
    },
  ];

  constructor(
    private location: Location,
    private libraryService: LibraryService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.idBook = params['id'];

      if (this.idBook) {
        this.libraryService
          .getOneBook(this.idBook)
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
          .subscribe((res: Book) => {
            this.bookForm.setValue({
              id: res.id,
              author: res.author,
              category: '',
              name: res.name,
              description: res.description,
              image: {
                id: res.image.id,
                src: res.image.src,
                alt: res.image.alt,
              },
              language: res.language,
              publisher: res.publisher,
              year: res.year,
            });
          });
      }
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

  onValidate(): boolean {
    return this.bookForm.status === 'VALID';
  }

  onSubmit(): void {
    const values = this.bookForm.value as BookForm;

    if (!this.onValidate()) {
      return;
    }

    if (this.idBook) {
      this.libraryService
        .updateBook(this.idBook, values)
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
            content: 'Livro atualizado com sucesso',
          });

          this.resetForm();
        });

      return;
    }

    this.libraryService
      .insertBook({
        ...values,
        image: { src: values.image.src, alt: values.image.alt },
      })
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
          content: 'Livro inserido com sucesso',
        });

        this.resetForm();
      });
  }

  resetForm(): void {
    const clear = (control: AbstractControl) => {
      control.clearValidators();
      control.updateValueAndValidity();
    };

    if (this.bookForm) {
      this.bookForm.reset();

      Object.keys(this.bookForm.controls).forEach((key) => {
        const control = this.bookForm.get(key);

        if (control instanceof FormGroup) {
          Object.keys(control.controls).forEach((innerKey) => {
            const innerControl = control.get(innerKey);

            if (innerControl) clear(innerControl);
          });

          return;
        }

        if (control) clear(control);
      });
    }
  }
}
