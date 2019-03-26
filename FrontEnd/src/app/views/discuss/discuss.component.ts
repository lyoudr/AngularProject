import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-discuss',
  templateUrl: './discuss.component.html',
  styleUrls: ['./discuss.component.scss'],
  providers:[
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: true } }
  ]
})
export class DiscussComponent implements OnInit {
  
  myInterval: number = 6000;
  slides: any[] = [];
  activeSlideIndex: number = 0;
  noWrapSlides: boolean = false;

  constructor() { 
    for (let i = 0; i < 4; i++) {
      this.addSlide();
    }
  }

  ngOnInit() {
  }

  addSlide(): void {
    this.slides.push({
      image: `https://loremflickr.com/900/500/sailing?random=${this.slides.length % 8 + 1}/`
    });
  }
}
