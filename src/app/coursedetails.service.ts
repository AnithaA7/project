import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursedetailsService {
  
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}
  // POST method to submit form data
  submitForm(courseData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/submitForm`, courseData);
  }

  // GET method to retrieve data
  getFormData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/data`); // Correct endpoint
  }

  updateForm(id: number, updatedData: any): Observable<any> {
    return this.http.put(`http://localhost:5000/updateForm/${id}`, updatedData);
  }
  
  

  deleteRecord(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
  
}
