import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { HomeComponent } from './home/home.component';
import { EssayComponent } from './essay/essay.component';
import { NotesComponent } from './notes/notes.component';

export const routes: Routes = [
    { path: '', redirectTo:'home', pathMatch:'full' },
    { path: 'home', component: HomeComponent },
    { path: 'quiz', component: QuizComponent },
    { path: 'essay', component: EssayComponent },
    { path: 'notes', component: NotesComponent },
];
