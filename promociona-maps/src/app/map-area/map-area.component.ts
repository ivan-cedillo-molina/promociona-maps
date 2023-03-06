import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../services/map.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map-area',
  templateUrl: './map-area.component.html',
  styleUrls: ['./map-area.component.css'],
})
export class MapAreaComponent implements OnInit {
  constructor(private mapService: MapService, private route: ActivatedRoute , private http: HttpClient ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      var lng: number;
      var lat: number;
      var zoom: number;

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

      var MAPBOX_API = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
      var ACCESS_TOKEN = environment.mapBoxToken;

      var url = `${MAPBOX_API}/${lng},${lat}.json?access_token=${ACCESS_TOKEN}&types=region,place`;
      var headers = new HttpHeaders().set('Content-Type', 'application/json');

      //var features:any  = {};

      // this.http.get(url, { headers }).pipe(
      //   map((response: any) => {
      //     features = response.features;
      //     //const provincia = features.find(f => f.place_type.includes('region')).text;
      //     //const ciudad = features.find(f => f.place_type.includes('place')).text;
      //     //return { provincia, ciudad };
      //   })
      // );


      this.mapService.buildMapRegion(zoom, lng, lat);

      this.mapService.map.on('load', () => {
        this.mapService.map.addSource('maine', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              // These coordinates outline Maine.
              coordinates: this.mapService.getPoligonsCoordinatesList(),
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
