import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PromptService } from '../prompt.service';
import { HeaderComponent } from '../header/header.component';
import domToImage from 'dom-to-image';
import jsPDF from 'jspdf';
import moment from 'moment';
import { ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-essay',
  standalone: true,
  imports: [RouterLink, FormsModule, HeaderComponent, CommonModule],
  templateUrl: './essay.component.html',
  styleUrls: ['./essay.component.scss', '../../styles.scss']
})
export class EssayComponent {

  constructor(private promptService: PromptService) {
  }
  @ViewChild('dataToExport', { static: false }) dataToExport!: ElementRef;

  essayParams: any = {
    topic: 'Science',
    purpose: 'To inform',
    author: 'High school student',
    reader: 'English Teacher',
    wordcount: 100,
    tone: 'Formal',
    sample: 'I write like this always.'
  };
  essayOutput: any = {};
  contentReady: boolean = true;

  generateEssay() {
    this.contentReady = false;
    this.promptService.getEssay(this.essayParams).subscribe(data => {
      this.essayOutput = data.response;
      this.contentReady = true;
    });
  }

  clearInput() {
    this.essayParams = {
      topic: '',
      purpose: '',
      author: '',
      reader: '',
      wordcount: null,
      tone: '',
      sample: ''
    };
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
