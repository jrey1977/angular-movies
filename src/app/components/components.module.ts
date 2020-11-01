import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SlideshowComponent } from './slideshow/slideshow.component';

import { PeliculasPosterGridComponent } from './peliculas-poster-grid/peliculas-poster-grid.component';
import { RatingModule } from 'ng-starrating';
import { PipesModule } from '../pipes/pipes.module';
import { SlideshowActoresComponent } from './slideshow-actores/slideshow-actores.component';



@NgModule({
  declarations: [
    NavbarComponent, 
    SlideshowComponent,
    PeliculasPosterGridComponent,
    SlideshowActoresComponent],
  imports: [
    CommonModule,
    RatingModule,
    PipesModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    SlideshowComponent,
    PeliculasPosterGridComponent,
    SlideshowActoresComponent
  ]
})
export class ComponentsModule { }
