import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  constructor(
    private http: HttpClient,
  ) { }
  private routeValue: any = 'home';

  setRouteValue(value: any) {
    this.routeValue = value;
  }

  getRouteValue() {
    return this.routeValue;
  }

  getQuiz(topic:any) {
    const options = { params: new HttpParams()
      .set('qno', topic.qno)
      .set('text',topic.text) 
      .set('difficulty', topic.difficulty)
    };
    return this.http.get<any>(`https://buji-backend-kzhjzxd4pa-uc.a.run.app/quiz`,options);
  }

  getEssay(topic:any) {
    const options = { params: new HttpParams()
      .set('topic', topic.topic) 
      .set('purpose', topic.purpose)
      .set('author', topic.author)
      .set('reader', topic.reader)
      .set('wordcount', topic.wordcount)
      .set('tone', topic.tone)
      .set('sample', topic.sample)
    };
    return this.http.get<any>(`https://buji-backend-kzhjzxd4pa-uc.a.run.app/essay`,options);
  }

  getNotes(topic:any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.http.put<any>(`https://buji-backend-kzhjzxd4pa-uc.a.run.app/notes`,{topic},httpOptions);
  }
}
