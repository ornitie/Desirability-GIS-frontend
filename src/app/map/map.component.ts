import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeoLocalizationService } from '../geo-localization.service';
// import { GeoLocalizationService } from '../geo-localization.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(
    private geoLocalizationService: GeoLocalizationService
  ) { }

  //map: L.Map = L.map('map');

  ngOnInit(): void {
    const center = L.latLng(4.6018, -74.0721);

    const map = L.map('map').setView(center, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.circle(center, {
      color: 'green',
      fillColor: 'green',
      fillOpacity: 0.5,
      radius: 1000 
    }).addTo(map);

    L.marker(center, {
      icon: L.divIcon({
        className: 'circle-label',
        html: 'Centro de Bogotá',
        iconAnchor: [75, 0]
      })
    }).addTo(map);

    this.obtenerUbicacionYCentrarMapa(map);
  }

  // ngAfterViewInit(): void {
  //   const center = L.latLng(4.6018, -74.0721);

  //   this.map = L.map('map').setView(center, 13);

  //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //   }).addTo(this.map);

  //   L.circle(center, {
  //     color: 'green',
  //     fillColor: 'green',
  //     fillOpacity: 0.5,
  //     radius: 1000 
  //   }).addTo(this.map);

  //   L.marker(center, {
  //     icon: L.divIcon({
  //       className: 'circle-label',
  //       html: 'Centro de Bogotá',
  //       iconAnchor: [75, 0]
  //     })
  //   }).addTo(this.map);

    // this.obtenerUbicacionYCentrarMapa();
  // }

  private obtenerUbicacionYCentrarMapa(map: L.Map): void {
    this.geoLocalizationService.obtenerUbicacion().subscribe(
      (ubicacionGeoJSON: any) => {
        const latlng = L.GeoJSON.coordsToLatLng(ubicacionGeoJSON.coordinates);
        console.log(latlng)
        map.setView(latlng, 13);
        L.marker(latlng).addTo(map);
      },
      (error: any) => {
        console.error('Error al obtener la ubicación:', error);
      }
    );
  }

}
