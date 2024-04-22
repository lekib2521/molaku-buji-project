import { Component, input, computed } from '@angular/core';
import { PromptService } from '../prompt.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';  

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss', '../../assets/main.scss']
})
export class QuizComponent {

  constructor(private promptService: PromptService) { }

  callb: any;
  topic: any;
  questionReady: boolean = false;
  answerCorrect: any = null;

  callbackend() {
    console.log(this.topic);
    this.promptService.getAny(this.topic).subscribe(data => {
      this.callb = data.response;
      console.log(this.callb);
      this.questionReady = true;
    });
  }

  optionSelect(option: any) {
    this.callb[option].checked = !this.callb[option].checked;
    if (this.callb[option].checked && this.callb.correctAnswer == option) {
      this.answerCorrect = true;
    } else {
      this.answerCorrect = false;
    }

    if(!this.callb[option].checked) this.answerCorrect = null
  }

  ngOnInit() {
    // this.callbackend();
  }
}

