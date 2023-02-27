import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapPointsComponent } from './map-points/map-points.component';
import { MapAreaComponent } from './map-area/map-area.component';


@NgModule({
  declarations: [
    AppComponent,
    MapPointsComponent,
    MapAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
