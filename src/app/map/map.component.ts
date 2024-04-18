import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Coordenadas del centro de Bogotá (Plaza de Bolívar)
    const center = L.latLng(4.6018, -74.0721);

    // Crear un mapa centrado en Bogotá
    const map = L.map('map').setView(center, 13);

    // Añadir una capa de mapa base (por ejemplo, OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Añadir un círculo verde en el centro de Bogotá
    L.circle(center, {
      color: 'green',
      fillColor: 'green',
      fillOpacity: 0.5,
      radius: 1000 // Radio en metros (1000 metros = 1 kilómetro)
    }).addTo(map);

    // Añadir un texto al centro del círculo
    L.marker(center, {
      icon: L.divIcon({
        className: 'circle-label',
        html: 'Centro de Bogotá',
        iconAnchor: [75, 0] // Ajustar el anclaje del icono para centrarlo sobre el círculo
      })
    }).addTo(map);
  }

}
