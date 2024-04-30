import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PromptService } from '../prompt.service';
import { NgxFileDropModule, NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import domToImage from 'dom-to-image';
import jsPDF from 'jspdf';
import moment from 'moment';
import { ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [RouterLink, NgxFileDropModule, CommonModule, HeaderComponent],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss', '../../styles.scss']
})
export class NotesComponent {

  constructor(private promptService: PromptService) { }
  @ViewChild('dataToExport', { static: false }) dataToExport!: ElementRef;
  notesOutput: any = "";
  notesInput: any = {};
  contentReady: boolean = true;
  fileEntry: any = {};

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
        this.fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        this.fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, this.fileEntry);
      }
    }
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }

  generateNotes() {
    this.fileEntry.file((file: File) => {
      // Here you can access the real file
      this.convertBlobToBase64(file).then((data: any) => {
        console.log(data);
        let notesParams = {data: data.split(',')[1], mimeType: file.type}
        data = data.split(',')[1];
        this.contentReady = false;
        this.promptService.getNotes(notesParams).subscribe(resp => {
          console.log(resp);
          this.notesOutput = resp.response;
          this.contentReady = true;
        });
      });
    });
  }

  public downloadAsPdf(): void {
    const width = this.dataToExport.nativeElement.clientWidth;
    const height = this.dataToExport.nativeElement.clientHeight + 40;
    let orientation = "";
    let imageUnit = 'pt';
    if (width > height) {
      orientation = "l";
    } else {
      orientation = "p";
    }
    domToImage.toPng(this.dataToExport.nativeElement, {
      width: width,
      height: height
    })
      .then((result: any) => {
        let jsPdfOptions = {
          orientation: width > height ? 'l' : 'p',
          unit: 'pt',
          format: [width + 50, height + 220]
        };
        const pdf = new jsPDF({
          orientation: width > height ? 'l' : 'p',
          unit: 'pt',
          format: [width + 50, height + 220]
        });
        pdf.setFontSize(48);
        pdf.setTextColor('#2585fe');
        // pdf.text(this.pdfName.value ? this.pdfName.value.toUpperCase() : 'Untitled dashboard'.toUpperCase(), 25, 75);
        pdf.setFontSize(24);
        pdf.setTextColor('#131523');
        pdf.text('Report date: ' + moment().format('ll'), 25, 115);
        pdf.addImage(result, 'PNG', 25, 185, width, height);
        pdf.save('file_name' + '.pdf');
      })
      .catch((error: any) => {
      });
  }
}
