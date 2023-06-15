import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  constructor() { }

  @Input() postData!: any; //this is the data that will be passed from the parent component 

  ngOnInit(): void {
    console.log(this.postData);
  }

}
