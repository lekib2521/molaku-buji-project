import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { PromptService } from '../prompt.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../styles.scss'],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class HomeComponent {
  constructor(private promptService: PromptService) { }

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
    }
  }

}
