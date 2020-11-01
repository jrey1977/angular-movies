import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera.model';
import Swiper from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {
  

  @Input() movies: Movie[];

  mySwiper: Swiper;

  constructor() { }

  ngAfterViewInit(){
    this.mySwiper = new Swiper('.swiper-container', {
      loop: true
    });
  }

  ngOnInit(): void {

  }

  slidePrevious(){
    this.mySwiper.slidePrev();
  }

  slideNext(){
    this.mySwiper.slideNext();
  }

}
