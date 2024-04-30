import { Component } from '@angular/core';
import { PromptService } from '../prompt.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';  
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, HeaderComponent],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss', '../../styles.scss']
})
export class QuizComponent {

  constructor(private promptService: PromptService) { }

  quizData: any;
  topic: any= {text:'Science',qno:1};
  questionReady: boolean = false;
  answerCorrect: any = null;
  quizStarted: boolean = false;
  focusQno: any=0;
  contentReady: boolean = true;

  generateQuiz() {
    this.contentReady = false;
    this.questionReady = false;
    console.log(this.topic);
    this.promptService.getQuiz(this.topic).subscribe(data => {
      this.quizData = data.response;
      this.focusQno = 0;
      this.quizData.rightAnswer = 0;
      this.questionReady = true;
      this.contentReady = true;
      this.quizStarted = false;
      this.answerCorrect = null;
    });
  }

  progressQuiz(qno:number){
    this.focusQno = qno;
    this.answerCorrect = null;
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

