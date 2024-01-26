import { Routes } from '@angular/router';

import { BooksComponent } from './books.component';
import { FormComponent } from './form/form.component';

export const BOOKS_ROUTES: Routes = [
  { path: '', component: BooksComponent },
  { path: 'form', component: FormComponent },
];
