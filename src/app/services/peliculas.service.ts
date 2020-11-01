import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map,tap } from 'rxjs/operators';
import { Cartelera, Movie } from '../interfaces/cartelera.model';
import { Cast, Casting } from '../interfaces/casting.model';
import { Pelicula } from '../interfaces/pelicula.model';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl:string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando:boolean = false;

  constructor( private http: HttpClient ) { }

  get params(){
      return {
          api_key: '462b8b7ee2149c0f2efa5d7cc966d419',
          language: 'es-ES',
          page: this.carteleraPage.toString()
      }
  }

  get colores(){
    return {
      1: 'red',
      2: 'red',
      3: '#e07404',
      4: '#e07404',
      5: 'yellow',
      6: '#84c7af',
      7: '#84c7af',
      8: 'green',
      9: 'green',
      10: 'green'
    }
  }

  reseteaCartelera(){
    this.carteleraPage = 1;
  }


  getCartelera():Observable<Movie[]>{
    
      if( this.cargando ){
        // RETORNO DE ARRAY VACÍO CON LA FUNCIÓN "OF" DE RXJS
        return of([]);
      }

      this.cargando = true;
      return this.http.get<Cartelera>(this.baseUrl+'/movie/now_playing', {
        params: this.params
      }).pipe(
          map(
            (respuesta) => {
                return respuesta.results
            }
          ),
          tap(
              ()=>{
                this.carteleraPage += 1;
                this.cargando = false;
              }
          )
      );
      
  }

  buscarPelicula(pelicula:string):Observable<Movie[]>{

    const params = {...this.params, page:'1', include_adult: 'true', query: pelicula};

    return this.http.get<Cartelera>(this.baseUrl+'/search/movie', {
      params
    }).pipe(
        map(
          (respuesta) => {
              return respuesta.results;
          }
        )
    );
  }

  // https://api.themoviedb.org/3/movie/724989?api_key=462b8b7ee2149c0f2efa5d7cc966d419&language=en-US
  getPelicula(id:string):Observable<Pelicula>{
    return this.http.get<Pelicula>(this.baseUrl+'/movie/'+id, {
      params: this.params
    }).pipe(
      catchError(
        err => {
          return of(null)
        }
      )
    );

  }

  // https://api.themoviedb.org/3/movie/299534/credits?api_key=462b8b7ee2149c0f2efa5d7cc966d419
  getActores(idPelicula:string):Observable<Cast[]>{
    return this.http.get<Casting>(this.baseUrl+'/movie/'+idPelicula+'/credits', {
      params: this.params
    }).pipe(
        map(
            respuesta => {
              return respuesta.cast;
            }
        ),
        catchError(
          err => {
            return of([])
          }
      )
    );
  }

}
