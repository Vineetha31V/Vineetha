import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Document } from '../models/document.model';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private apiUrl = 'https://localhost:8080/api/search'; // Replace with your API

  constructor(private http: HttpClient) {}

  getDocuments(type: 'jira' | 'confluence'): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?query=Jira Ticket&type=${type}`);
  }
  // getDocuments(): Observable<Document[]> {
  //   // Static dummy data
  //   const documents: Document[] = [
  //     { "id": 1, "name": "Product requirements.docx", "createdDate": "5 days ago", "icon": "assets/icons/doc.png" },
  //     { "id": 2, "name": "Design mockups v2.sketch", "createdDate": "3 months ago", "icon": "assets/icons/sketch.png" },
  //     { "id": 3, "name": "User research findings.ppt", "createdDate": "1 year ago", "icon": "assets/icons/ppt.png" },
  //     { "id": 4, "name": "Marketing strategy.docx", "createdDate": "2 weeks ago", "icon": "assets/icons/doc.png" },
  //     { "id": 5, "name": "Sales report.xlsx", "createdDate": "4 months ago", "icon": "assets/icons/excel.png" },
  //     { "id": 6, "name": "Budget analysis.pdf", "createdDate": "1 week ago", "icon": "assets/icons/pdf.png" },
  //     { "id": 7, "name": "Customer feedback.csv", "createdDate": "6 months ago", "icon": "assets/icons/csv.png" },
  //     { "id": 8, "name": "Technical documentation.docx", "createdDate": "3 days ago", "icon": "assets/icons/doc.png" },
  //     { "id": 9, "name": "Website wireframes.fig", "createdDate": "8 months ago", "icon": "assets/icons/figma.png" },
  //     { "id": 10, "name": "Project roadmap.ppt", "createdDate": "2 months ago", "icon": "assets/icons/ppt.png" },
  //     { "id": 11, "name": "HR policies.pdf", "createdDate": "5 months ago", "icon": "assets/icons/pdf.png" },
  //     { "id": 12, "name": "API reference.json", "createdDate": "10 days ago", "icon": "assets/icons/json.png" },
  //     { "id": 13, "name": "Meeting notes.txt", "createdDate": "1 year ago", "icon": "assets/icons/txt.png" },
  //     { "id": 14, "name": "Product backlog.xlsx", "createdDate": "7 months ago", "icon": "assets/icons/excel.png" },
  //     { "id": 15, "name": "Team retrospective.docx", "createdDate": "3 weeks ago", "icon": "assets/icons/doc.png" },
  //     { "id": 16, "name": "Sprint review.ppt", "createdDate": "4 days ago", "icon": "assets/icons/ppt.png" },
  //     { "id": 17, "name": "Competitor analysis.pdf", "createdDate": "9 months ago", "icon": "assets/icons/pdf.png" },
  //     { "id": 18, "name": "Social media strategy.docx", "createdDate": "2 months ago", "icon": "assets/icons/doc.png" },
  //     { "id": 19, "name": "Annual report.xlsx", "createdDate": "11 months ago", "icon": "assets/icons/excel.png" },
  //     { "id": 20, "name": "QA test cases.csv", "createdDate": "6 days ago", "icon": "assets/icons/csv.png" }
  //   ];
    
  //   return of(documents);
  // }
}