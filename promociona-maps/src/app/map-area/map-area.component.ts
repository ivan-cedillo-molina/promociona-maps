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
        zoom = 15;
      }
      else {
        lng = this.mapService.lng;
        lat = this.mapService.lat;
        zoom = this.mapService.zoom;
      }

      this.mapService.buildMapRegion(zoom, lng, lat);

      //this.mapService.buildMapRegion(17, -3.70259, 40.41948 );


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
                  [-3.70259, 40.41948],
                  [-3.70238, 40.41948],
                  [-3.70238, 40.41935],
                  [-3.70259, 40.41935],
                  [-3.70259, 40.41948]
                ],
                [
                  [-3.348871, 40.486145],
                  [-3.346231, 40.485822],
                  [-3.347664, 40.482447],
                  [-3.348871, 40.486145]
                ],
                [
                  [-3.547041, 40.424108],
                  [-3.545942, 40.422944],
                  [-3.543638, 40.422057],
                  [-3.542072, 40.423558],
                  [-3.539081, 40.423138],
                  [-3.538559, 40.426399],
                  [-3.541764, 40.427768],
                  [-3.545398, 40.427596],
                  [-3.545922, 40.425362],
                  [-3.547041, 40.424108]
                ],
                [
                  [-5.979979, 37.383895],
                  [-5.980205, 37.383720],
                  [-5.979895, 37.383435],
                  [-5.979670, 37.383612]
                ]
              ],
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
