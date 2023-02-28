import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import { GeoJSON } from '../models/geo-json';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from 'src/app/services/map.service';
import { AppComponent } from '../app.component';


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
      this.mapService.map.addSource('points', {
        type: 'geojson',
        data: '../assets/earthquakes.geojson',
        cluster: true,
        clusterMaxZoom: 50,
        clusterRadius: 100,
      });
    });


    var draw = new MapboxDraw({
      displayControlsDefault: false,
      // Select which mapbox-gl-draw control buttons to add to the map.
      controls: {
        polygon: true,
        trash: true
      },
      // Set mapbox-gl-draw to draw by default.
      // The user does not have to click the polygon control button first.
      defaultMode: 'draw_polygon'
    });
    this.mapService.map.addControl(draw);

    this.mapService.map.on('draw.create', function (event: any) {
      //const layerType = e.features[0].geometry.type;
      //const layerId = e.features[0].id;
      // Aquí puedes agregar lógica para manejar la creación de una nueva capa dibujada

      var polygon = event.features[0];
      var coordinates = polygon.geometry.coordinates;

    var item = new GeoJSON();
    item.id = polygon.id;
    item.coordinates = coordinates;
  

    var listaParcelas : GeoJSON[] = [];
    listaParcelas.push(item);
  
    //if (typeof listaParcelas === GeoJSON[]) {
      localStorage.setItem('listaTareas', JSON.stringify(listaParcelas));
    //} 
     
      //this.savePoligon(polygon) ;

    });

    // this.mapService.map.on('draw.update', function (event: any) {
    //   //const layerType = e.features[0].geometry.type;
    //   //const layerId = e.features[0].id;
    //   // Aquí puedes agregar lógica para manejar la creación de una nueva capa dibujada

    //   var polygon = event.features[0];
    //   var coordinates = polygon.geometry.coordinates;
    //   alert(coordinates)
    // });

  }

  public savePoligon(polygon: any) : void {

    
    
  }
}

