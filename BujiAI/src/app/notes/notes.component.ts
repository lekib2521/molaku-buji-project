import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PromptService } from '../prompt.service';
import { NgxFileDropModule, NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [RouterLink, NgxFileDropModule, CommonModule, HeaderComponent],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss', '../../styles.scss']
})
export class NotesComponent {

  constructor(private promptService: PromptService) { }
  notesOutput: any = "";
  notesInput: any = {};

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
          console.log(droppedFile.relativePath, file, fileEntry);
          this.convertBlobToBase64(file).then((data: any) => {
            console.log(data);
            let notesParams = {data: data.split(',')[1], mimeType: file.type}
            data = data.split(',')[1];
            this.promptService.getNotes(notesParams).subscribe(resp => {
              console.log(resp);
              this.notesOutput = resp.response;
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
