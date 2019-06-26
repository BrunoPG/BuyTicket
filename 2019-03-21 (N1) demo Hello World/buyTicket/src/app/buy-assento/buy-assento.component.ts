import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-buy-assento',
  templateUrl: './buy-assento.component.html',
  styleUrls: ['./buy-assento.component.scss'],
})
export class BuyAssentoComponent implements OnInit {

  @Input() cor: string;
  @Input() assento: string;


  constructor() { }

  ngOnInit() { }


}
