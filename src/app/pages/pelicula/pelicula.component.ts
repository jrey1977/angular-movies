import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Pelicula } from 'src/app/interfaces/pelicula.model';
import { PeliculasService } from 'src/app/services/peliculas.service';

import { Cast, Casting } from 'src/app/interfaces/casting.model';

import {ViewEncapsulation} from '@angular/core';

import { StarRatingComponent } from 'ng-starrating';

import { Location } from '@angular/common';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public movie:Pelicula;
  public color: string;
  public reparto:Cast[] = [];
  


  constructor( 
      private activatedRouter: ActivatedRoute,
      private peliculasService: PeliculasService,
      private location: Location,
      private route: Router
  ) { }

  ngOnInit(): void {

    // Desestructuro el objeto params y creo una variable id con el valor id de ese objeto
    const {id} = this.activatedRouter.snapshot.params;
    console.log('id',id);

    combineLatest([

      this.peliculasService.getPelicula(id),

      this.peliculasService.getActores(id)

    ]).subscribe(
        ( [respuestaObservable1, respuestaObservable2] ) => {
            console.log(respuestaObservable1,respuestaObservable2);
            if(!respuestaObservable1){
                  this.route.navigateByUrl('error');
            }
            let puntuacion:number = Math.round(respuestaObservable1.vote_average);
            this.color = this.peliculasService.colores[puntuacion];
            
            // GUARDO LA PELÍCULA EN LA VARIABLE MOVIE
            this.movie = respuestaObservable1; 

            // CAMBIO LA IMAGEN DE FONDO DEL BODY
            document.body.style.backgroundImage = "url(https://image.tmdb.org/t/p/original/"+this.movie.backdrop_path+')';

            this.reparto = respuestaObservable2.filter( actor => actor.profile_path !== null);
        }
    )


  }

  regresar(){
    this.location.back();
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    document.body.style.backgroundImage = "none";
  }

}
