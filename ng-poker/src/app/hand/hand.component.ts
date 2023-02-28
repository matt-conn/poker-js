import { Component, OnInit, Input } from '@angular/core';
import { Hand } from '../hand';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnInit {
	@Input() pokerHand: any;

  	constructor() { }

  	ngOnInit(): void {
  	}

}
