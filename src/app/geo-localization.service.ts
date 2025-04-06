import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface GeoJSONPoint {
  type: 'Point';
  coordinates: [number, number];
}

@Injectable({
  providedIn: 'root'
})
export class GeoLocalizationService {

  constructor() { }

  obtenerUbicacion(): Observable<GeoJSONPoint> {
    return new Observable(observer => {
      if (!navigator.geolocation) {
        observer.error('Geolocation is not supported by your browser');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates: [number, number] = [
            position.coords.longitude,
            position.coords.latitude
          ];
          
          observer.next({
            type: 'Point',
            coordinates: coordinates
          });
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}
