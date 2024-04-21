import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoLocalizationService {

  constructor() { }

  obtenerUbicacion(): Observable<any> {
    return new Observable(observer => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const ubicacionGeoJSON = {
              type: 'Point',
              coordinates: [position.coords.longitude, position.coords.latitude]
            };
            observer.next(ubicacionGeoJSON);
            observer.complete();
          },
          (error: GeolocationPositionError) => {
            observer.error('Error al obtener la ubicación: ' + error.message);
          }
        );
      } else {
        observer.error('Geolocalización no soportada en este navegador.');
      }
    });
  }
}
