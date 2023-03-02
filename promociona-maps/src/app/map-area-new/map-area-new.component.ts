import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import { GeoJSON } from '../models/geo-json';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from 'src/app/services/map.service';
import { AppComponent } from '../app.component';
import { Feature, FeatureCollection } from '../models/geo-json-points';

@Component({
  selector: 'app-map-area-new',
  templateUrl: './map-area-new.component.html',
  styleUrls: ['./map-area-new.component.css']
})


export class MapAreaNewComponent implements OnInit {
  constructor(private mapService: MapService, private route: ActivatedRoute, private appComponent: AppComponent) {
  }

  ngOnInit(): void {
    this.mapService.buildMapRegionNew();

    this.mapService.map.on('load', () => {

      this.mapService.map.addSource('maine', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });

      this.mapService.map.addLayer({
        id: 'poligonos',
        type: 'fill',
        source: 'maine',
        paint: {
          'fill-color': '#088',
          'fill-opacity': 0.8
        },
        filter: ['==', '$type', 'Polygon']
      });


      var draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true
        },
      });

      this.mapService.map.addControl(draw);
      draw.add(this.mapService.listaParcelasNew);

      this.mapService.map.on('click', 'poligonos', (e) => {
        const feature = e.features[0];
        draw.changeMode('direct_select', { featureId: feature.id });
      });
    });


    this.mapService.map.on('draw.create', (event: any) => {
      var polygon = event.features[0];
      var coordinates = polygon.geometry.coordinates;

      var item: GeoJSON = {};
      item.id = polygon.id;
      item.coordinates = coordinates;

      if (this.mapService.listaParcelasNew.features != undefined) {
        if (!this.mapService.listaParcelasNew.features.find(x => x.id == polygon.id)) {
          this.mapService.listaParcelasNew.features.push(polygon);
        }
      }
      else {
        this.mapService.listaParcelasNew.features = [];
        this.mapService.listaParcelasNew.features.push(polygon);
      }

      localStorage.setItem('listaParcelasNew', JSON.stringify(this.mapService.listaParcelasNew));
    });

    this.mapService.map.on('draw.update', (event: any) => {
      var polygon = event.features[0];
      var coordinates = polygon.geometry.coordinates;

      var item: GeoJSON = {};
      item.id = polygon.id;
      item.coordinates = coordinates;

      if (this.mapService.listaParcelasNew.features != undefined) {
        var indexToRemove = this.mapService.listaParcelasNew.features.findIndex(x => x.id == polygon.id);

        if (indexToRemove !== -1) {
          this.mapService.listaParcelasNew.features.splice(indexToRemove, 1);
        }

        this.mapService.listaParcelasNew.features.push(polygon);
      }
      else {
        this.mapService.listaParcelasNew.features = [];
        this.mapService.listaParcelasNew.features.push(polygon);
      }

      localStorage.setItem('listaParcelasNew', JSON.stringify(this.mapService.listaParcelasNew));
    });

    this.mapService.map.on('draw.delete', (event: any) => {
      var polygon = event.features[0];

      if (this.mapService.listaParcelasNew.features != undefined) {
        var indexToRemove = this.mapService.listaParcelasNew.features.findIndex(x => x.id == polygon.id);

        if (indexToRemove !== -1)
          this.mapService.listaParcelasNew.features.splice(indexToRemove, 1);
      }

      localStorage.setItem('listaParcelasNew', JSON.stringify(this.mapService.listaParcelasNew));
    });

  }
}

