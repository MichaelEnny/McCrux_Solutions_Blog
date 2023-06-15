import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor( private afs: AngularFirestore) { }

  addSubscriber(subData: any){
    this.afs.collection('subscribers').add(subData).then(() => {
      console.log('Subscriber Saved Successfully');
    })
  }

  checkSubscriber(subEmail: string){
    return this.afs.collection('subscribers', ref => ref.where('email', '==', subEmail)).get();
  }

}
