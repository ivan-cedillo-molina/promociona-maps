import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map-area',
  templateUrl: './map-area.component.html',
  styleUrls: ['./map-area.component.css']
})

export class MapAreaComponent implements OnInit {

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.mapService.buildMapRegion();

    this.mapService.map.on('load', () => {
      // Add a data source containing GeoJSON data.
      this.mapService.map.addSource('maine', {
          type: 'geojson',
          data: {
          type: 'Feature',
          geometry: {
          type: 'Polygon',
          // These coordinates outline Maine.
          coordinates: [
          [
          [-67.13734, 45.13745],
          [-66.96466, 44.8097],
          [-68.03252, 44.3252],
          [-69.06, 43.98],
          [-70.11617, 43.68405],
          [-70.64573, 43.09008],
          [-70.75102, 43.08003],
          [-70.79761, 43.21973],
          [-70.98176, 43.36789],
          [-70.94416, 43.46633],
          [-71.08482, 45.30524],
          [-70.66002, 45.46022],
          [-70.30495, 45.91479],
          [-70.00014, 46.69317],
          [-69.23708, 47.44777],
          [-68.90478, 47.18479],
          [-68.2343, 47.35462],
          [-67.79035, 47.06624],
          [-67.79141, 45.70258],
          [-67.13734, 45.13745]
          ]
          ]
          }
          }
          });

          // Add a new layer to visualize the polygon.
          this.mapService.map.addLayer({
            'id': 'maine',
            'type': 'fill',
            'source': 'maine', // reference the data source
            'layout': {},
            'paint': {
            'fill-color': '#0080ff', // blue color fill
            'fill-opacity': 0.5
            }
            });
            // Add a black outline around the polygon.
            this.mapService.map.addLayer({
            'id': 'outline',
            'type': 'line',
            'source': 'maine',
            'layout': {},
            'paint': {
            'line-color': '#000',
            'line-width': 3
            }
            });


      // this.mapService.map.addLayer({
      //   id: 'clusters',
      //   type: 'circle',
      //   source: 'points',
      //   filter: ['has', 'point_count'], // Filtrar solo los marcadores de agrupación
      //   paint: {
      //       'circle-color': [
      //           'step',
      //           ['get', 'point_count'],
      //           '#51bbd6',
      //           100,
      //           '#f1f075',
      //           750,
      //           '#f28cb1'
      //       ],
      //       'circle-radius': [
      //           'step',
      //           ['get', 'point_count'],
      //           20,
      //           100,
      //           30,
      //           750,
      //           40
      //       ]
      //   }
      // });

      // this.mapService.map.addLayer({
      //   id: 'cluster-count',
      //   type: 'symbol',
      //   source: 'points',
      //   filter: ['has', 'point_count'], // Filtrar solo los marcadores de agrupación
      //   layout: {
      //       'text-field': '{point_count_abbreviated}',
      //       'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      //       'text-size': 20
      //   }
      // });

      // this.mapService.map.addLayer({
      //   id: 'earthquake_circle',
      //   type: 'circle',
      //   source: 'points',
      //   filter: ['!=', 'cluster', true],
      //   paint: {
      //     'circle-color': '#11b4da',
      //     'circle-radius': 4,
      //     'circle-stroke-width': 1,
      //     'circle-stroke-color': '#fff'
      //     }
      // });
    });
  }
}
