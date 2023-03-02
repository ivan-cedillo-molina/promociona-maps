import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapPointsComponent } from './map-points/map-points.component';
import { MapAreaComponent } from './map-area/map-area.component';
import { MapAreaHeatComponent } from './map-area-heat/map-area-heat.component';


@NgModule({
  declarations: [
    AppComponent,
    MapPointsComponent,
    MapAreaComponent,
    MapAreaHeatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
