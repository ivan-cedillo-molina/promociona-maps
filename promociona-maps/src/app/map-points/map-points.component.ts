import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map-points',
  templateUrl: './map-points.component.html',
  styleUrls: ['./map-points.component.css'],
})
export class MapPointsComponent implements OnInit {
  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.mapService.buildMap();

    this.mapService.map.on('load', () => {
      this.mapService.map.addSource('points', {
        type: 'geojson',
        data: '../assets/earthquakes.geojson',
        cluster: true,
        clusterMaxZoom: 40,
        clusterRadius: 100,
      });

      this.mapService.map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'points',
        filter: ['has', 'point_count'], // Filtrar solo los marcadores de agrupación
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1',
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40,
          ],
        },
      });

      this.mapService.map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'points',
        filter: ['has', 'point_count'], // Filtrar solo los marcadores de agrupación
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 20,
        },
      });

      this.mapService.map.addLayer({
        id: 'earthquake_circle',
        type: 'circle',
        source: 'points',
        filter: ['!=', 'cluster', true],
        paint: {
          'circle-color': '#11b4da',
          'circle-radius': 4,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
        },
      });
    });
  }
}
