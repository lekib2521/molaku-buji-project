import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';  
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-essay',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './essay.component.html',
  styleUrl: './essay.component.scss'
})
export class EssayComponent {
  essayParams:any = {
    topic: 'Science',
    purpose: 'To inform',
    author: 'High school student',
    reader: 'English Teacher',
    wordcount: 100,
    tone: 'Formal',
    sample: 'I write like this always.'
  };
  essayOutput: any = {};

  generateEssay() {

  }
}
