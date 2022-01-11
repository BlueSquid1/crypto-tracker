import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container" style="width:20rem; margin: 2rem auto;">
      <div class="form-group" >
        <label for="name-input">Enter a name:</label>
        <input class="form-control" id="name-input" required [(ngModel)]="nameInput">
        <button class="btn btn-primary"(click)="greetMe()">Greet Me</button>
      </div>
      <div class="name-display">
        <p *ngIf="responseDisplay && responseDisplay.length > 0">
          {{ responseDisplay }}
        </p>
      </div>
    </div>
  `
})
export class AppComponent {

  constructor(private http: HttpClient) {  }

  nameInput: string = '';
  responseDisplay: string = '';

  greetMe(): void {
    this.http.get(`/api/${ this.nameInput }`)
      .subscribe((response: any) => this.responseDisplay = response.greeting);
  }
}
