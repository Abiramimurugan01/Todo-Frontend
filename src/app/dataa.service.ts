import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataaService {
  
  constructor(private httpclient:HttpClient) { }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  getData(): Observable<any>{
    const token = this.getToken();
    console.log(token);
    
    if (!token) {
      console.error('No token found');
     
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.httpclient.get('http://127.0.0.1:8000/api/todos', {headers});
  }
 
  insertData(data:any): Observable<any>{
    const token = this.getToken();
    console.log( token);
    
    if (!token) {
      console.error('No token found');
     
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.httpclient.post('http://127.0.0.1:8000/api/todos',data,{headers});
 
  }
 
  getTaskById(id:any): Observable<any>{
    const token = this.getToken();
    console.log( token);
    
    if (!token) {
      console.error('No token found');
     
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.httpclient.get(`http://127.0.0.1:8000/api/todos/${id}`,{headers});
  }
 
  
  updateTask(id:any,data:any): Observable<any>{
    const token = this.getToken();
    console.log( token);
    
    if (!token) {
      console.error('No token found');
     
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.httpclient.put(`http://127.0.0.1:8000/api/todos/${id}`,data,{headers});
  }
 
  deleteData(id:any): Observable<any>{
    const token = this.getToken();
    console.log( token);
    
    if (!token) {
      console.error('No token found');
     
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.httpclient.delete(`http://127.0.0.1:8000/api/todos/${id}`,{headers});
    
  }
  
}
