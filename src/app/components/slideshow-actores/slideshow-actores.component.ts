import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Cast } from 'src/app/interfaces/casting.model';
import Swiper from 'swiper';

@Component({
  selector: 'app-slideshow-actores',
  templateUrl: './slideshow-actores.component.html',
  styleUrls: ['./slideshow-actores.component.css']
})
export class SlideshowActoresComponent implements OnInit, AfterViewInit {

  @Input() actores: Cast[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log('Este es el cast', this.actores);
  }

  ngAfterViewInit(){
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 5.3,
      freeMode: true,
      spaceBetween: 15
    })
  }

}
