import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';  
import { FormsModule } from '@angular/forms';
import { PromptService } from '../prompt.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-essay',
  standalone: true,
  imports: [RouterLink, FormsModule, HeaderComponent],
  templateUrl: './essay.component.html',
  styleUrl: './essay.component.scss'
})
export class EssayComponent {

  constructor(private promptService: PromptService) { }
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
    this.promptService.getEssay(this.essayParams).subscribe(data => {
      this.essayOutput = data.response;
    });
  }
}
