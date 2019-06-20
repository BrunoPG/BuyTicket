import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage  {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor() { }

  

}
