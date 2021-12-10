import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  createUserForm: FormGroup
  constructor(
    private fb: FormBuilder,
  ) {
    this.createUserForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.compose([Validators.required, Validators.minLength(3),])],
    },)
  }

}
