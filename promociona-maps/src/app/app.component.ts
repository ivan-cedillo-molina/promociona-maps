import { Component, OnInit } from '@angular/core';
import { GeoJSON } from './models/geo-json';
import { MapService } from './services/map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'promociona-maps';

  constructor(private mapService: MapService) {
  }

  ngOnInit(): void {
    const jsonLista = localStorage.getItem('listaParcelas');
    if (jsonLista !== null) {
      const listaObjetos: GeoJSON[] = JSON.parse(jsonLista);
      this.mapService.listaParcelas = listaObjetos;
    }
  }
}
