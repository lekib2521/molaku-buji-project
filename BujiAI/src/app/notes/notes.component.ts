import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PromptService } from '../prompt.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {

  constructor(private promptService: PromptService) { }
  notesOutput:any = "";

  generateNotes() {
    this.promptService.getNotes({}).subscribe(data => {
      console.log(data);      
      this.notesOutput = data.response;
    });
  }
}
