import { Component, OnInit } from '@angular/core';
import { Sub } from '../models/sub';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent implements OnInit {

  isEmailError: boolean = false;
  isSubscribed: boolean = false;

  constructor( private subService: SubscribersService) { }

  ngOnInit(): void {
  }

  onSubmit(fomVal: any){

    const subData: Sub = {
      name: fomVal.name,
      email: fomVal.email
    }

    
    this.subService.checkSubscriber(subData.email).subscribe(val => {
      console.log(val);

      if(val.empty){
        this.subService.addSubscriber(subData);
        this.isSubscribed = true;
      }
      else{
        //console.log('Subscriber email address already exists');
        this.isEmailError = true;
      }
    })
  }

}
