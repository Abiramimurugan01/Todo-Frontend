import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(private httpclient:HttpClient) { }
  getData(): Observable<any>{
    return this.httpclient.get('http://127.0.0.1:8000/api/todos');
  }
 
  insertData(data:any): Observable<any>{
    return this.httpclient.post('http://127.0.0.1:8000/api/todos',data);
 
  }
 
  getTaskById(id:any): Observable<any>{
    return this.httpclient.get(`http://127.0.0.1:8000/api/todos/${id}`);
  }
 
  
  updateTask(id:any,data:any): Observable<any>{
    return this.httpclient.put(`http://127.0.0.1:8000/api/todos/${id}`,data);
  }
 
  deleteData(id:any): Observable<any>{
    return this.httpclient.delete(`http://127.0.0.1:8000/api/todos/${id}`);
    
  }
  
}
