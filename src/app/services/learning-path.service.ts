import { Injectable } from '@angular/core';
import { createClient, Entry, EntryCollection, EntrySkeletonType } from 'contentful';
import { Observable, from, map } from 'rxjs';
import { environment } from '../../assets/environments/environment';
interface CourseFields {
  title: string;
  instructor: string;
  image: string;
  pdfUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Course extends EntrySkeletonType {
  fields: CourseFields;
  contentTypeId: string;
}


@Injectable({
  providedIn: 'root'
})

export class LearningPathService {
  [x: string]: any;
  private client = createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.accessToken,
  });

  constructor() {
  }

  getCategories(): Observable<string[]> {
    return from(this.client.getEntries({
      content_type: 'learningPath',
      order: ['sys.updatedAt'] // Sort categories by their updated date
    })).pipe(
      map((response: EntryCollection<any>) => {
        const categories = response.items
          .map(item => (item.fields as any)['categories'] as string)
          .filter(category => category); // Remove undefined/null values
  
        // Sort categories by updatedAt (most recent first)
        return [...new Set(categories)].sort((a, b) => {
          const categoryA = response.items.find(item => (item.fields as any)['categories'] === a);
          const categoryB = response.items.find(item => (item.fields as any)['categories'] === b);
          
          const updatedAtA = categoryA?.sys?.updatedAt || '';
          const updatedAtB = categoryB?.sys?.updatedAt || '';
          
          return updatedAtB.localeCompare(updatedAtA); // Most recent first
        });
      })
    );
  }
  

  getCardData(category: string): Observable<CourseFields[]> {
    return from(this.client.getEntries({
      content_type: 'learningPath',
      'fields.categories[match]': category,
      order: ['-sys.updatedAt', '-sys.createdAt'], // Sort by update date first, then creation date
      include: 2
    })).pipe(
      map((response: EntryCollection<any>) => {
        const entries = response.items || [];
        const allCourses: CourseFields[] = [];
        
        for (const entry of entries) {
          const courseEntries = ((entry.fields as any)['course'] || []) as Entry<Course>[];
          for (const courseEntry of courseEntries) {
            if (courseEntry?.fields) {
              const imageAsset = (courseEntry.fields as any).image?.fields?.file;
              const imageUrl = imageAsset ? `https:${imageAsset.url}` : '';
              
              const pdfAsset = (courseEntry.fields as any).pdfUrl?.fields?.file;
              const pdfUrl = pdfAsset ? `https:${pdfAsset.url}` : '';
              
              allCourses.push({
                title: String(courseEntry.fields.title || ''),
                instructor: String(courseEntry.fields.instructor || ''),
                image: imageUrl,
                pdfUrl: pdfUrl,
                createdAt: courseEntry.sys.createdAt,
                updatedAt: courseEntry.sys.updatedAt
              });
            }
          }
        }
        
        // Sort courses by updatedAt first, +then createdAt
        return allCourses.sort((a, b) => {
          // First compare by updatedAt
          const updateDiff = (b.updatedAt || '').localeCompare(a.updatedAt || '');
          if (updateDiff !== 0) return updateDiff;
          
          // If updatedAt is the same, compare by createdAt
          return (b.createdAt || '').localeCompare(a.createdAt || '');
        });
      })
    );
  }
  
}
