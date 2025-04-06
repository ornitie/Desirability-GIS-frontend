import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeoLocalizationService } from '../geo-localization.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  private userMarker?: L.Marker;
  private userCircle?: L.Circle;
  private tileLayer?: L.TileLayer;
  useDarkMap = false;
  showCircle = true;

  constructor(
    private geoLocalizationService: GeoLocalizationService
  ) { }

  ngOnInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    const center = L.latLng(4.6018, -74.0721);
    this.map = L.map('map').setView(center, 16);

    const lightMap = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
    const darkMap = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

    this.tileLayer = L.tileLayer(this.useDarkMap ? darkMap : lightMap, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker(center, {
      icon: L.divIcon({
        className: 'circle-label',
        html: 'Centro de Bogotá',
        iconAnchor: [75, 0]
      })
    }).addTo(this.map);

    this.getUserLocation();
  }

  private getUserLocation(): void {
    this.geoLocalizationService.obtenerUbicacion().subscribe(
      (ubicacionGeoJSON: { type: string; coordinates: [number, number] }) => {
        const latlng = L.GeoJSON.coordsToLatLng(ubicacionGeoJSON.coordinates);
        
        if (this.userMarker) {
          this.map.removeLayer(this.userMarker);
        }
        if (this.userCircle) {
          this.map.removeLayer(this.userCircle);
        }

        const userIcon = L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });

        this.userMarker = L.marker(latlng, {
          icon: userIcon,
          title: 'Tu ubicación'
        }).addTo(this.map);

        this.userMarker.bindPopup(`
          <div class="user-location-popup">
            <h3>Tu ubicación</h3>
            <p>Latitud: ${latlng.lat.toFixed(6)}</p>
            <p>Longitud: ${latlng.lng.toFixed(6)}</p>
          </div>
        `);

        if (this.showCircle) {
          this.userCircle = L.circle(latlng, {
            color: '#4285F4',
            fillColor: '#4285F4',
            fillOpacity: 0.2,
            radius: 1000 // 1km in meters
          }).addTo(this.map);
        }

        this.map.setView(latlng, 16);
      },
      (error: Error) => {
        console.error('Error al obtener la ubicación:', error);
      }
    );
  }

  toggleMapTheme(): void {
    this.useDarkMap = !this.useDarkMap;
    const lightMap = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
    const darkMap = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
    
    if (this.tileLayer) {
      this.map.removeLayer(this.tileLayer);
    }
    
    this.tileLayer = L.tileLayer(this.useDarkMap ? darkMap : lightMap, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  toggleCircle(): void {
    this.showCircle = !this.showCircle;
    if (this.userCircle) {
      if (this.showCircle) {
        this.userCircle.addTo(this.map);
      } else {
        this.map.removeLayer(this.userCircle);
      }
    }
  }

  enableClickForCoordinates(): void {
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      alert(`Latitud: ${lat}, Longitud: ${lng}`);
    });
  }
}
