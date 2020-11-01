import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera.model';
import { StarRatingComponent } from 'ng-starrating';
import { Router } from '@angular/router';
import { PeliculasService } from 'src/app/services/peliculas.service';


@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {

  @Input() movies: Movie[] = [];

  constructor( 
    private router: Router,
    public peliculasService: PeliculasService
    ) { }

  ngOnInit(): void {
      //console.log('Pelis heredadas desde servicio de componente padre' , this.movies);
  }

  clickMostarPelicula(idPelicula:string){
      this.router.navigate(['pelicula', idPelicula]);
  }


}
