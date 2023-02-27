import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../services/map.service';



@Component({
  selector: 'app-map-points',
  templateUrl: './map-points.component.html',
  styleUrls: ['./map-points.component.css']
})


export class MapPointsComponent implements OnInit {
   markers = [];
   markersOnScreen = [];

  constructor(private mapService: MapService) { }

  ngOnInit() {


    this.mapService.buildMap();

    this.mapService.map.on('load', () => {
      this.mapService.map.addSource('earthquakes', {
        type: 'geojson',
        data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
        cluster : true,
        clusterRadius: 80,
      });

     
      const mag1 = ['<', ['get', 'mag'], 2];
      const mag2 = ['all', ['>=', ['get', 'mag'], 2], ['<', ['get', 'mag'], 3]];
      const mag3 = ['all', ['>=', ['get', 'mag'], 3], ['<', ['get', 'mag'], 4]];
      const mag4 = ['all', ['>=', ['get', 'mag'], 4], ['<', ['get', 'mag'], 5]];
      const mag5 = ['>=', ['get', 'mag'], 5];
       
      // colors to use for the categories
      const colors = ['#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c'];


      this.mapService.map.addLayer({
        id: 'earthquake_circle',
        type: 'circle',
        source: 'earthquakes',
        filter: ['!=', 'cluster', true],
         paint: {
           'circle-color': '#e31a1c',        
           'circle-opacity': 0.6,
           'circle-radius': 30
         }
        });


        this.mapService.map.addLayer({
          'id': 'earthquake_label',
          'type': 'symbol',
          'source': 'earthquakes',
          'filter': ['!=', 'cluster', true],
          'layout': {
          'text-field': [
          'number-format',
          ['get', 'mag'],
          { 'min-fraction-digits': 1, 'max-fraction-digits': 1 }
          ],
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-size': 10
          },
          'paint': {
          'text-color': [
          'case',
          ['<', ['get', 'mag'], 3],
          'black',
          'white'
          ]
          }
          });

          this.mapService.map.on('render', () => {
            if (!this.mapService.map.isSourceLoaded('earthquakes')) return;
            this.updateMarkers();
          });

    });
  }
  

  updateMarkers() {
    const newMarkers = {};
    const features = this.mapService.map.querySourceFeatures('earthquakes');

    // for every cluster on the screen, create an HTML marker for it (if we didn't yet),
    // and add it to the map if it's not there already
    for (const feature of features) {
      const coords = feature.geometry.coordinates;
      const props = feature.properties;
      if (!props.cluster) continue;
      const id = props.cluster_id;
      
      var marker = this.markers[id];
      // if (!marker) {
      //   var el = createDonutChart(props);
      //   marker = this.markers[id] = new mapboxgl.Marker({
      //     element: el
      //   }).setLngLat(coords);
      // }
      // newMarkers[id] = marker;
      
      // if (!markersOnScreen[id]) marker.addTo(map);
    }



  }
}