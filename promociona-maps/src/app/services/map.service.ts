import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})


export class MapService {
  mapbox = (mapboxgl as typeof mapboxgl);
  map: any;
  style = `mapbox://styles/mapbox/streets-v11`;
  // Coordenadas de la localización donde queremos centrar el mapa
  lat = 40.4165000;
  lng = -3.7025600;
  zoom = 5;


  

  constructor() {
    // Asignamos el token desde las variables de entorno
    this.mapbox.accessToken = environment.mapBoxToken;
  }
  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]      
    });

  // const markers = [
  //     {
  //       coordinates: [-3.74922, 40.463667], // Coordenadas del primer marcador
  //       description: 'Este es el primer marcador' // Descripción del primer marcador
  //     },
  //     {
  //       coordinates: [-3.70379, 40.416775], // Coordenadas del segundo marcador
  //       description: 'Este es el segundo marcador' // Descripción del segundo marcador
  //     }
  //   ];  

    

  //   markers.forEach(marker => {

  //     const lngLat = new mapboxgl.LngLat(marker.coordinates[0], marker.coordinates[1]);

  //     new mapboxgl.Marker()
  //       .setLngLat(lngLat)
  //       .setPopup(new mapboxgl.Popup().setHTML(marker.description))
  //       .addTo(this.map);
  //   });



  // this.map.map.on('load', () => {
  //   this.map.map.addSource('my-data', {
  //     type: 'geojson',
  //     data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
  //   });

  //   this.map.map.addLayer({
  //     id: 'my-layer',
  //     type: 'circle',
  //     source: 'my-data',
  //     paint: {
  //       'circle-radius': 6,
  //       'circle-color': '#B42222'
  //     }
  //   });
  // });


    



      this.map.addControl(new mapboxgl.NavigationControl());
    }
}