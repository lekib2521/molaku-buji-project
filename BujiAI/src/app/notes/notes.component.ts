import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PromptService } from '../prompt.service';
import { NgxFileDropModule, NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [RouterLink, NgxFileDropModule, CommonModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {

  constructor(private promptService: PromptService) { }
  notesOutput:any = "";

  generateNotes() {
    this.promptService.getNotes({}).subscribe(data => {     
      this.notesOutput = data.response;
    });
  }

  convertBlobToBase64 = (blob: any) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          this.convertBlobToBase64(file).then((data: any) => {
            console.log(data);
            data = data.split(',')[1];
            this.promptService.getNotes(data).subscribe(resp => {
              console.log(resp);
            });
          });
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }
}
