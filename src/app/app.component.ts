import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  profileForm = this.fb.group({
    firstName: ['', Validators.maxLength(5)],
    lastName: [''],
    otherName: ['']
  });

  constructor(private fb: FormBuilder) {}
}
