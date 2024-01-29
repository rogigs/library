import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibraryService } from '../../services/library/library.service';
import { AppMaterialModule } from '../../shared/app-material.module';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [AppMaterialModule, HttpClientModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
  providers: [LibraryService],
})
export class BooksComponent implements OnInit {
  books: any;

  constructor(private router: Router, private libraryService: LibraryService) {}

  ngOnInit() {
    this.libraryService.getAllBooks(1, 10).subscribe((data) => {
      this.books = data;
    });
  }

  log(state: any) {
    console.log(state);
  }

  onSubmit() {}

  goToForm(id?: string): void {
    this.router.navigate(['/books/form'], {
      queryParams: id ? { id } : {},
    });
  }

  goToDetails(id: string): void {
    this.router.navigate([`/books/details/${id}`]);
  }

  deleteBook(id: string): void {
    const user = '1'; // TODO: get user

    this.libraryService.deleteBook(id, user).subscribe(
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
}
