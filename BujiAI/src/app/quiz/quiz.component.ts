import { Component, input, computed } from '@angular/core';
import { PromptService } from '../prompt.service';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {

  constructor(private promptService: PromptService) { }

  callb: any;
  topic: any;
  questionReady: boolean = false;

  callbackend() {
    console.log(this.topic);
    this.promptService.getAny(this.topic).subscribe(data => {
      this.callb = data.response;
      console.log(this.callb);
      this.questionReady = true;
    });
  }

  ngOnInit() {
    // this.callbackend();
  }
}

