import { Component, input, computed } from '@angular/core';
import { PromptService } from '../prompt.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {

  constructor(private promptService: PromptService) { }

  callb: any;
  topic: any;

  callbackend() {
    
    console.log(this.topic);
    
    this.callb = this.promptService.getAny(this.topic);
  }

  ngOnInit() {
    // this.callbackend();
  }
}

