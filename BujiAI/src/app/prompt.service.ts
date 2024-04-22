import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  constructor(
    private http: HttpClient,
  ) { }

  getAny(topic:any) {
    console.log(topic);
    const options = { params: new HttpParams().set('topic', topic) };
    
    this.http.get<any>(`http://localhost:3000/`,options).subscribe(data =>{
      console.log(data);
    })
  }
}
