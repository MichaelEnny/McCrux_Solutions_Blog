import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor( private afs: AngularFirestore, private toastr: ToastrService ) { }

      //load data from firestore database
  loadData() {

    return this.afs.collection('subscribers').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        })
      })
    )

  }

    //delete data from firestore database
  deleteData(id: any){
    //    this.afs.collection('categories').doc(id).delete().then(docRef => { or the below code will work
    this.afs.doc(`subscribers/${id}`).delete().then(docRef => {
      console.log(docRef);
      this.toastr.success('Subscriber Successfully Deleted ..!');
   })
    .catch(error => { console.log(error) })
  }

}
