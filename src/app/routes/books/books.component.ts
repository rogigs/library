import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { LibraryService } from '../../services/library/library.service';
import { AppMaterialModule } from '../../shared/app-material.module';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [AppMaterialModule, AsyncPipe],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
  providers: [LibraryService],
})
export class BooksComponent implements OnInit {
  books: any;

  constructor(private router: Router, private libraryService: LibraryService) {}

  ngOnInit() {
    this.libraryService
      .getAllBooks(1, 10)
      .pipe(take(1))
      .subscribe((res: any) => {
        this.books = res.data.items;
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
    this.libraryService.deleteBook(id).subscribe();
  }
}
