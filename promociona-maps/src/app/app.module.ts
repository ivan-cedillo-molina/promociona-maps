import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapPointsComponent } from './map-points/map-points.component';
import { MapAreaComponent } from './map-area/map-area.component';
import { MapPointsHeatComponent } from './map-points-heat/map-points-heat.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    MapPointsComponent,
    MapAreaComponent,
    MapPointsHeatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
