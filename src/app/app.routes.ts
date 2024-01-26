import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'books' },
  {
    path: 'books',
    loadChildren: () =>
      import('./routes/books/books.routes').then((m) => m.BOOKS_ROUTES), // isso muda
  },
];
