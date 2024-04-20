import { Component } from '@angular/core';
import { PromptService } from '../prompt.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {

  constructor(private promptService: PromptService) { }

  callb: any;

  callbackend() {
    this.callb = this.promptService.getAny();
  }

  ngOnInit() {
    // this.callbackend();
  }
}

