import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';
import { createClient } from 'contentful';
import { environment } from '../../assets/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private client = createClient({
      space: environment.contentful.spaceId,
      accessToken: environment.contentful.accessToken,
    });
  constructor() {} 

  
  getArrivalCards(): Observable<any[]> {
    return from(this.client.getEntries({
      content_type: 'arrivalsContent',
      order: ['-sys.updatedAt', '-sys.createdAt'],
      include: 2,
    })).pipe(
      map(response => response.items.map((item: any) => {
        const imageUrl = item.fields.arrivalImage.fields.file.url;
        console.log('Arrival Image URL:', imageUrl); // Log the URL
        return {
          title: item.fields.imageTitle,
          instructor: item.fields.Instructor,
          image: imageUrl,
        };
      }))
    );
  }
  
  getRecommendedCards(): Observable<any[]> {
    return from(this.client.getEntries({
      content_type: 'recommendedContent',
      order: ['-sys.updatedAt', '-sys.createdAt'],
      include: 2,
    })).pipe(
      map(response => response.items.map((item: any) => ({
        title: item.fields.imageTitle,
        instructor: item.fields.Instructor,
        image: item.fields.recommendImage.fields.file.url,
      })))
    );
  }
  
}
