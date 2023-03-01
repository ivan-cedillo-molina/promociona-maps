import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { GeoJSON } from '../models/geo-json';
//import { Feature, FeatureCollection } from '../models/geo-json-points';
import { FeatureCollection, Feature, Polygon } from 'geojson';


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
  listaParcelas: GeoJSON[] = [];

  listaParcelasNew: FeatureCollection = {
    type: "FeatureCollection",
    features: []
  };

  constructor() {
    // Asignamos el token desde las variables de entorno
    this.mapbox.accessToken = environment.mapBoxToken;
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map-points',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());
  }

  buildMapRegion(zoom: number, lng: number, lat: number) {
    this.map = new mapboxgl.Map({
      container: 'map-region',
      style: this.style,
      zoom: zoom,
      center: [lng, lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());
  }

  buildMapRegionNew() {
    this.map = new mapboxgl.Map({
      container: 'map-area-new',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());
  }


  getPointList(): FeatureCollection {

    var items: FeatureCollection = {
      type: "FeatureCollection",
      features: []
    };

    this.listaParcelasNew.features.forEach(element => {
      var text = "";
      if (element.geometry.type === 'Polygon') {
        var feature: Feature = {
          type: "Feature",
          geometry: { type: "Point", coordinates: element.geometry.coordinates[0][0] },
          properties: {
            name: element.id
          }
        };
      }

      items.features.push(feature);
    });

    return items;
  }

  getPoligonsCoordinatesList() {

    var items: any = [];

    this.listaParcelas.forEach(element => {
      items.push(element.coordinates[0]);
    });

    return items;
  }


}
