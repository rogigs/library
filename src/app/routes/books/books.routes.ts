import { Routes } from '@angular/router';

import { BooksComponent } from './books.component';
import { DetailsComponent } from './details/details.component';
import { FormComponent } from './form/form.component';

export const BOOKS_ROUTES: Routes = [
  { path: '', component: BooksComponent },
  { path: 'form', component: FormComponent },
  { path: 'details/:id', component: DetailsComponent },
];
