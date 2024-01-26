import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
    this.books = {
      status: 200,
      data: [
        {
          id: '1212',
          name: 'ANGULAR',
          img: {
            src: 'https://m.media-amazon.com/images/I/51OucWzOf9L.jpg',
            alt: 132,
          },
          publisher: 'OReilly',
          autor: 'Shyam',
          year: '',
          language: 'português',
          description: 'dsbadusadasdas',
        },
      ],
    };
  }

  log(state: any) {
    console.log(state);
  }

  onSubmit() {}
}
