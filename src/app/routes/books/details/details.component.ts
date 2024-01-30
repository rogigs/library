import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { LibraryService } from '../../../services/library/library.service';
import { AppMaterialModule } from '../../../shared/app-material.module';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  details: any;

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private libraryService: LibraryService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.libraryService
        .getOneBook(params.get('id') as string)
        .pipe(take(1))
        .subscribe((res: any) => {
          console.log('🚀 ~ DetailsComponent ~ .subscribe ~ res:', res);
          this.details = res.data;
        });
    });
  }

  goBackToPrevPage(): void {
    this.location.back();
  }

  goToForm(id: string): void {
    this.router.navigate(['/books/form'], {
      queryParams: { id },
    });
  }
}
