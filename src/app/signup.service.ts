import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpclient: HttpClient) { }

  insertDetail(data: any) {
    return this.httpclient.post('http://127.0.0.1:8000/api/signup', data);
  }

  login(credentials: { email: string, password: string }) {
    return this.httpclient.post('http://127.0.0.1:8000/api/login', credentials);
  }

  storeToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
  removeToken(): void {
    localStorage.removeItem('jwtToken');
  }
  
  getTasks() {
    const token = this.getToken();
    
    if (!token) {
      console.error('No token found');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    
    return this.httpclient.get('http://127.0.0.1:8000/api/todos', {
      headers
    });
  }
  
  createTask(data: any) {
    const token = this.getToken();4200
    return token ? this.httpclient.post('http://127.0.0.1:8000/api/todos',data, {
      headers: { Authorization: `Bearer ${token}` }
    }) : null;
  }

  updateTask(id: any, data: any) {
    const token = this.getToken();
    return token ? this.httpclient.put(`http://127.0.0.1:8000/api/todos/${id}`,data, {
      headers: { Authorization: `Bearer ${token}` }
    }) : null;
  }

  deleteTask(id: any) {
    const token = this.getToken();
    return token ? this.httpclient.delete(`http://127.0.0.1:8000/api/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }) : null;
  }
}



