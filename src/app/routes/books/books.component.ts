import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppMaterialModule } from '../../shared/app-material.module';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit {
  books: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.books = {
      status: 200,
      data: [
        {
          id: '1212',
          name: 'ANGULAR',
          img: {
            src: 'https://m.media-amazon.com/images/I/51OucWzOf9L.jpg',
            alt: 'Capa do livro Angular',
          },
          publisher: 'OReilly',
          author: 'Shyam',
          year: '',
          language: 'português',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
      ],
    };
  }

  log(state: any) {
    console.log(state);
  }

  onSubmit() {}

  goToForm() {
    this.router.navigate(['/books/form']);
  }
}
