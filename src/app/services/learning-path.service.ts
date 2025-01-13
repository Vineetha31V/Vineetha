import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LearningPathService {
  private categories = ['Web Development', 'Cloud', 'UI/UX Design', 'Java', 'Python'];

  private cardData : { [key: string]: any[] }={
    'Web Development': [
      {
        title: 'Foundations of Web Design: Building Effective and Engaging Websites',
        instructor: 'Sarah Blake',
        image: 'assets/images/1stL.png',
        pdfUrl: 'assets/web-design.pdf',
      },
      {
        title: 'Advanced Web Development',
        instructor: 'John Doe',
        image: 'assets/images/2ndL.png',
        pdfUrl: 'assets/web-design.pdf',
      },
      {
        title: 'Foundations of Web Design: Building Effective and Engaging Websites',
        instructor: 'Sarah Blake',
        image: 'assets/images/3rdL.png',
        pdfUrl: 'assets/web-design.pdf'
      },
      {
        title: 'Foundations of Web Design: Building Effective and Engaging Websites',
        instructor: 'Sarah Blake',
        image: 'assets/images/3rdL.png',
        pdfUrl: 'assets/web-design.pdf'
      },
      
    ],
    'Cloud': [
      {
        title: 'Introduction to Cloud Computing',
        instructor: 'Sarah Blake',
        image: 'assets/images/1stL.png',
        pdfUrl: 'assets/web-design.pdf',
      },
      {
        title: 'Introduction to Cloud Computing',
        instructor: 'John Doe',
        image: 'assets/images/2ndL.png',
        pdfUrl: 'assets/web-design.pdf',
      },
      {
        title: 'Introduction to Cloud Computings',
        instructor: 'Sarah Blake',
        image: 'assets/images/1stL.png',
        pdfUrl: 'assets/web-design.pdf',
      },
     
    ],
    'UI/UX Design': [
      {
        title: 'Introduction to Cloud Computing',
        instructor: 'Sarah Blake',
        image: 'assets/images/1stL.png',
        pdfUrl: 'assets/web-design.pdf',
      },
      {
        title: 'Introduction to Cloud Computing',
        instructor: 'John Doe',
        image: 'assets/images/2ndL.png',
        pdfUrl: 'assets/web-design.pdf',
      },
      {
        title: 'Introduction to Cloud Computings',
        instructor: 'Sarah Blake',
        image: 'assets/images/1stL.png',
        pdfUrl: 'assets/web-design.pdf',
      },
    ],
    'Java': [
      {
        title: 'Introduction to Cloud Computing',
        instructor: 'Sarah Blake',
        image: 'assets/images/1stL.png',
        pdfUrl: 'assets/web-design.pdf',
      },
      {
        title: 'Introduction to Cloud Computing',
        instructor: 'John Doe',
        image: 'assets/images/2ndL.png',
        pdfUrl: 'assets/web-design.pdf',
      },
      {
        title: 'Introduction to Cloud Computings',
        instructor: 'Sarah Blake',
        image: 'assets/images/1stL.png',
        pdfUrl: 'assets/web-design.pdf',
      },
    ],
    'Python': [
      {
        title: 'Introduction to Cloud Computing',
        instructor: 'Sarah Blake',
        image: 'assets/images/1stL.png',
        pdfUrl: 'assets/web-design.pdf',
      },
      {
        title: 'Introduction to Cloud Computing',
        instructor: 'John Doe',
        image: 'assets/images/2ndL.png',
        pdfUrl: 'assets/web-design.pdf',
      },
      {
        title: 'Introduction to Cloud Computings',
        instructor: 'Sarah Blake',
        image: 'assets/images/1stL.png',
        pdfUrl: 'assets/web-design.pdf',
      },
    ]
    // Add more categories and cards...
  };

  getCategories(): string[] {
    return this.categories;
  }

  getCardData(category: string): any[] {
    return this.cardData[category] || [];
  }
}
