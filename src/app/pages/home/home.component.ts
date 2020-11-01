import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera.model';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies:Movie[] = [];
  public moviesSlideshow:Movie[] = [];

  @HostListener( 'window:scroll', ['$event'] )
  onScroll() {
    // POSICIÓN DE LA VENTANA RESPECTO AL TOP 0
    const pos = (document.documentElement.scrollTop || document.body.scrollTop);
    // ALTURA TOTAL DE LA VENTANA CON EL SCROLL
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);
    
    if( pos > (max- 1800) ){
        if(this.peliculasService.cargando){
            return;
        }
        this.peliculasService.getCartelera().subscribe(
              movies => {
                this.movies.push(...movies)
            }
        );
    }
  }

  constructor( private peliculasService: PeliculasService ) { }

  ngOnInit(): void {



          // OBTENER PELÍCULAS
          this.peliculasService.getCartelera()
          .subscribe(
              movies => {
              //  console.log(respuesta.results);
                this.movies = movies;
                this.moviesSlideshow = movies;
              }
          );


  }

  ngOnDestroy(){
    this.peliculasService.reseteaCartelera();
  }

}
