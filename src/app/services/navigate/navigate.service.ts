import { Location } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Router } from 'express';

@Injectable({
  providedIn: 'root',
})
export class NavigateService {
  private router = inject(Router);
  private location = inject(Location);

  goToForm(id?: string): void {
    this.router.navigate(['/books/form'], {
      queryParams: id ? { id } : {},
    });
  }

  goToDetails(id: string): void {
    this.router.navigate([`/books/details/${id}`]);
  }

  goToPrevPage(): void {
    this.location.back();
  }
}
