import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map-points-heat',
  templateUrl: './map-points-heat.component.html',
  styleUrls: ['./map-points-heat.component.css'],
})
export class MapPointsHeatComponent implements OnInit {
  constructor(private mapService: MapService, private router: Router) {}

  ngOnInit() {
    this.mapService.buildMapHeat();

    this.mapService.map.on('load', () => {
      this.mapService.map.addSource('points', {
        type: 'geojson',
        // data: '../assets/earthquakes.geojson',
        data: this.mapService.getPointList(),
        cluster: true,
        clusterMaxZoom: 50,
        clusterRadius: 50,
      });

      this.mapService.map.addLayer({
        id: 'points',
        type: 'circle',
        source: 'points',
        paint: {
          'circle-radius': 0,
          'circle-opacity': 0
        },
      });

      this.mapService.map.addLayer(
        {
          id: 'trees-heat',
          type: 'heatmap',
          source: 'points',
          maxzoom: 15,
          paint: {
            // increase weight as diameter breast height increases
            'heatmap-weight': {
              property: 'dbh',
              type: 'exponential',
              stops: [
                [1, 0],
                [62, 1]
              ]
            },
            // increase intensity as zoom level increases
            'heatmap-intensity': {
              stops: [
                [11, 1],
                [15, 3]
              ]
            },
            // assign color values be applied to points depending on their density
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0, 'rgba(0, 0, 0, 0)',
              0.2, 'rgba(255, 255, 0, 0.3)',
              0.4, 'rgba(255, 0, 0, 0.5)',
              0.6, 'rgba(255, 0, 255, 0.7)',
              0.8, 'rgba(0, 0, 255, 0.8)'
            ],
            // increase radius as zoom increases
            'heatmap-radius': {
              stops: [
                [0, 50],
                [50, 100]
              ]
            },
            // decrease opacity to transition into the circle layer
            'heatmap-opacity': {
              default: 1,
              stops: [
                [14, 1],
                [15, 0]
              ]
            }
          }
        },
        'waterway-label'
      );



    });
  }
}
