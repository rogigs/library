import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../../shared/app-material.module';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [AppMaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  formGroup!: FormGroup;
  languages = [
    { value: 'en', viewValue: 'Inglês' },
    { value: 'es', viewValue: 'Espanhol' },
    { value: 'pt', viewValue: 'Português' },
    { value: 'fr', viewValue: 'Francês' },
    { value: 'de', viewValue: 'Alemão' },
    { value: 'it', viewValue: 'Italiano' },
    { value: 'jp', viewValue: 'Japonês' },
  ];

  constructor(private formBuilder: FormBuilder, private location: Location) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      id: { value: '', disabled: true },
      name: '',
      author: '',
      publisher: '',
      year: '',
      description: '',
      language: '',
      img: this.formBuilder.group({
        src: '',
        alt: '',
      }),
    });
  }

  goBackToPrevPage(): void {
    this.location.back();
  }

  onValidate(): boolean {
    // if (!this.formGroup.value.hour) {
    //   this.messageError = 'Por favor preencha o formulário';
    //   return false;
    // }

    return true;
  }

  onSubmit() {
    if (this.onValidate()) {
    }

    console.log(this.formGroup.value);
  }

  onReset() {
    this.formGroup.reset();
  }
}
