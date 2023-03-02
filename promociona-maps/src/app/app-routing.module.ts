import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapAreaNewComponent } from './map-area-new/map-area-new.component';
import { MapAreaComponent } from './map-area/map-area.component';
import { MapPointsHeatComponent } from './map-points-heat/map-points-heat.component';
import { MapPointsComponent } from './map-points/map-points.component';

const routes: Routes = [
  { path: 'map-area', component: MapAreaComponent},
  { path: 'map-area-new', component: MapAreaNewComponent},
  { path: 'map-points', component: MapPointsComponent},
  { path: 'map-points-heat', component: MapPointsHeatComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
