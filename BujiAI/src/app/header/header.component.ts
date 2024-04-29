import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PromptService } from '../prompt.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', '../../styles.scss']
})
export class HeaderComponent {
  routeValue: any;
  constructor(private promptService: PromptService) { }
  ngOnInit() {
    this.routeValue = this.promptService.getRouteValue();
  }

  route(type: any) {
    switch (type) {
      case 1: {
        this.promptService.setRouteValue('quiz');
        break;
      }
      case 2: {
        this.promptService.setRouteValue('essay');
        break;
      }
      case 3: {
        this.promptService.setRouteValue('notes');
        break;
      }
      case 4: {
        this.promptService.setRouteValue('home');
        break;
      }
    } 
  }
}
