import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map-area',
  templateUrl: './map-area.component.html',
  styleUrls: ['./map-area.component.css'],
})
export class MapAreaComponent implements OnInit {
  constructor(private mapService: MapService, private route: ActivatedRoute) { }

  ngOnInit() {



    this.route.queryParams.subscribe(params => {
      var lng: number;
      var lat: number;
      var zoom : number;

      if (params['lng'] != undefined) {
        lng = params['lng'];
        lat = params['lat'];
        zoom = 10;
      }
      else {
        lng = this.mapService.lng;
        lat = this.mapService.lat;
        zoom = this.mapService.zoom;
      }

      this.mapService.buildMapRegion(zoom, lng, lat);


      this.mapService.map.on('load', () => {
        this.mapService.map.addSource('maine', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              // These coordinates outline Maine.
              coordinates: this.mapService.getPoligonsCoordinatesList() ,
            },
          },
        });

        // Add a new layer to visualize the polygon.
        this.mapService.map.addLayer({
          id: 'maine',
          type: 'fill',
          source: 'maine', // reference the data source
          layout: {},
          paint: {
            'fill-color': '#0080ff', // blue color fill
            'fill-opacity': 0.5,
          },
        });
        // Add a black outline around the polygon.
        this.mapService.map.addLayer({
          id: 'outline',
          type: 'line',
          source: 'maine',
          layout: {},
          paint: {
            'line-color': '#000',
            'line-width': 3,
          },
        });
      });



    });
  }

}
