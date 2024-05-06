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

  ngOnInit(): void {
    const center = L.latLng(4.6018, -74.0721);

    const map = L.map('map').setView(center, 13);

    const lightMap = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
    const darkMap = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"

    L.tileLayer(true ? darkMap : lightMap, {
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
