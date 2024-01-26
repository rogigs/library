import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppMaterialModule } from '../../../shared/app-material.module';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  details = {
    status: 200,
    data: {
      id: '1212',
      createdByUser: '3123123213',
      updateDate: '20/20/2020',
      updateByUser: '20/20/2010',
      active: 0,
      category: 'romance',
      name: 'ANGULAR',
      img: {
        src: 'https://m.media-amazon.com/images/I/51OucWzOf9L.jpg',
        alt: 132,
      },
      publisher: 'OReilly',
      author: 'Shyam',
      year: '10/10/2020',
      language: 'português',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  };

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      console.log(params.get('id'));
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
