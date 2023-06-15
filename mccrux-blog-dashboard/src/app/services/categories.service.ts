import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  //save data to firestore database
  saveData(data: any) {
      //console.log(categoryData);
      this.afs.collection('categories').add(data).then(docRef => {
        console.log(docRef);
        this.toastr.success('Category Successfully Added');
     })
      .catch(error => { console.log(error) })
  }

  //load data from firestore database
  loadData() {

    return this.afs.collection('categories').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        })
      })
    )

  }

  //update data in firestore database
  updateData(id: any, EditData: any){
    this.afs.doc(`categories/${id}`).update(EditData).then(docRef => {
      console.log(docRef);
      this.toastr.success('Category Successfully Updated');
   })
    .catch(error => { console.log(error) })
  }

  //delete data from firestore database
  deleteData(id: any){
    //    this.afs.collection('categories').doc(id).delete().then(docRef => { or the below code will work
    this.afs.doc(`categories/${id}`).delete().then(docRef => {
      console.log(docRef);
      this.toastr.success('Category Successfully Deleted');
   })
    .catch(error => { console.log(error) })
  }

}
