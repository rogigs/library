import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
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
}
