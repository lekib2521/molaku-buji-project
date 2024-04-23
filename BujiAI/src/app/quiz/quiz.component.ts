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

  quizData: any;
  topic: any= {text:'Science',qno:1};
  questionReady: boolean = false;
  answerCorrect: any = null;
  quizStarted: boolean = false;
  focusQno: any=0;

  generateQuiz() {
    console.log(this.topic);
    this.promptService.getQuiz(this.topic).subscribe(data => {
      this.quizData = data.response;
      this.quizData.rightAnswer = 0;
      this.questionReady = true;
    });
  }

  progressQuiz(qno:number){
    this.focusQno = qno;
    if(qno==-1){
      return;
    } else if (qno==1){
      this.quizStarted = true;
    }
  }

  optionSelect(option: any) {
    this.quizData[this.focusQno][option].checked = !this.quizData[this.focusQno][option].checked;
    if (this.quizData[this.focusQno][option].checked && this.quizData[this.focusQno].correctAnswer == option) {
      this.answerCorrect = true; this.quizData.rightAnswer+=1;
    } else {
      this.answerCorrect = false;
    }

    if(!this.quizData[this.focusQno][option].checked) this.answerCorrect = null
  }

  ngOnInit() {
  }
}

