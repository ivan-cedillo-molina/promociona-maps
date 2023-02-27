import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapAreaComponent } from './map-area/map-area.component';
import { MapPointsComponent } from './map-points/map-points.component';

const routes: Routes = [
  { path: 'map-area', component: MapAreaComponent},
  { path: 'map-points', component: MapPointsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
