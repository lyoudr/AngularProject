import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-eachrestaurant',
  templateUrl: './eachrestaurant.component.html',
  styleUrls: ['./eachrestaurant.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EachrestaurantComponent implements OnInit {
  selectedFile: File;
  source: HTMLImageElement;
  items: any;
  slides: HTMLCollectionOf<HTMLElement>;
  dots: HTMLCollectionOf<HTMLImageElement>;
  slideIndex: number = 1;

  constructor(
    public dialog: MatDialog
  ){}

  ngOnInit() {
    this.SlidePictures();
  }

  /*1.Add New Photos */
  public openUploadDialog() {
    let dialogRef = this.dialog.open(DialogComponent, 
      { width: '50%', height: '50%' , data : { source: this.source }}
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log('result is =>', result);
      this.source = result;
      this.source.style.width = '100%';
      let newDIV = document.createElement('div');
      newDIV.className = 'mySlides';
      newDIV.appendChild(this.source);
      document.getElementById('gallery').appendChild(newDIV);
    });
  }

  /* 2. Control Image Slides */
  SlidePictures(){
    this.showSlides(this.slideIndex);
  }

  showSlides(n) {
    var i;
    this.slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
    this.dots = document.getElementsByClassName("demo") as HTMLCollectionOf<HTMLImageElement>;
    var captionText = document.getElementById("caption");
    if (n > this.slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = this.slides.length}
    for (i = 0; i < this.slides.length; i++) {
      this.slides[i].style.display = "none";
    }
    for (i = 0; i < this.dots.length; i++) {
      this.dots[i].className = this.dots[i].className.replace("active", "");
    }
    this.slides[this.slideIndex-1].style.display = "block";
    this.dots[this.slideIndex-1].className += " active";
    captionText.innerHTML = this.dots[this.slideIndex-1].alt;
  }

  // Next/previous controls
  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }
  // Thumbnail image controls
  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }
}
