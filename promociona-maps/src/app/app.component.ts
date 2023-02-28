import { Component, OnInit } from '@angular/core';
import { GeoJSON } from './models/geo-json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit  {
  title = 'promociona-maps';
  listaParcelas : GeoJSON[] = [];

  ngOnInit(): void {
    let lista = localStorage.getItem('listaParcelas');

    if (typeof lista === 'string') {
      this.listaParcelas = JSON.parse(lista);
    } 
  }
  
}
