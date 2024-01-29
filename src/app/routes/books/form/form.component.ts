import { CommonModule, Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LibraryService } from '../../../services/library/library.service';
import { AppMaterialModule } from '../../../shared/app-material.module';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    AppMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  providers: [LibraryService],
})
export class FormComponent {
  idBook: string | null = null;
  formGroup!: FormGroup;
  languages = [
    { value: '0bb8bfec-9a27-4f9b-bcdc-c40a074eb31a', viewValue: 'Inglês' },
    { value: '0bb8bfec-9a27-4f9b-bcdc-c40a074eb31a', viewValue: 'Espanhol' },
    { value: '0bb8bfec-9a27-4f9b-bcdc-c40a074eb31a', viewValue: 'Português' },
    { value: '0bb8bfec-9a27-4f9b-bcdc-c40a074eb31a', viewValue: 'Francês' },
    { value: '0bb8bfec-9a27-4f9b-bcdc-c40a074eb31a', viewValue: 'Alemão' },
    { value: '0bb8bfec-9a27-4f9b-bcdc-c40a074eb31a', viewValue: 'Italiano' },
    { value: '0bb8bfec-9a27-4f9b-bcdc-c40a074eb31a', viewValue: 'Japonês' },
  ];
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
    private formBuilder: FormBuilder,
    private location: Location,
    private libraryService: LibraryService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.idBook = params['id'];
      if (this.idBook) {
        this.libraryService.getOneBook(this.idBook).subscribe(
          (response: any) => {
            this.formGroup = this.formBuilder.group({
              id: { value: response.id, disabled: true },
              name: response.name,
              author: response.author,
              publisher: response.publisher,
              year: response.year,
              description: response.description,
              language: response.language,
              categoryId: '', // TODO: make category
              image: this.formBuilder.group({
                src: '',
                alt: '',
              }),
            });
          },
          (error) => {
            console.error('Erro ao enviar a requisição POST:', error);
            alert('Erro ao enviar a requisição POST.');
          }
        );
      }
    });

    this.formGroup = this.formBuilder.group({
      id: { value: '', disabled: true },
      name: '',
      author: '',
      publisher: '',
      year: '',
      description: '',
      language: '',
      categoryId: '',
      image: this.formBuilder.group({
        src: '',
        alt: '',
      }),
    });
  }

  goBackToPrevPage(): void {
    this.location.back();
  }

  onValidate(): boolean {
    // if (!this.formGroup.value.hour) {
    //   this.messageError = 'Por favor preencha o formulário';
    //   return false;
    // }

    return true;
  }

  onSubmit(): void {
    if (this.idBook) {
      this.libraryService
        .updateBook(this.idBook, this.formGroup.value)
        .subscribe(
          (response) => {
            console.log('Requisição POST enviada com sucesso:', response);
            alert('Requisição POST enviada com sucesso!');
          },
          (error) => {
            console.error('Erro ao enviar a requisição POST:', error);
            alert('Erro ao enviar a requisição POST.');
          }
        );

      return;
    }

    this.libraryService.insertBook(this.formGroup.value).subscribe(
      (response) => {
        console.log('Requisição POST enviada com sucesso:', response);
        alert('Requisição POST enviada com sucesso!');
      },
      (error) => {
        console.error('Erro ao enviar a requisição POST:', error);
        alert('Erro ao enviar a requisição POST.');
      }
    );
  }

  onReset() {
    this.formGroup.reset();
  }
}
