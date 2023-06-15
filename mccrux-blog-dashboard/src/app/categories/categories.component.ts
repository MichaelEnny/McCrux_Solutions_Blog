import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
//import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  //to use a service , we have to inject it in the constructor first
  //constructor(private afs: AngularFirestore) { }

  categoryArray: Array<any> = [];
  formCategory: string = '';
  formStatus: String = 'Add';
  categoryId: string = '';

  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {

    this.categoryService.loadData().subscribe(val => {
      console.log(val);
      this.categoryArray = val;
    })

  }

  onSubmit(formData: any) {

    let categoryData: Category = {
      category: formData.value.category
    }

    if(this.formStatus == 'Add'){
      this.categoryService.saveData(categoryData);
      formData.reset(); // to reset the input field after submitting the form
    }
    else if(this.formStatus == 'Edit'){
      this.categoryService.updateData(this.categoryId, categoryData);
      formData.reset(); // to reset the input field after submitting the form
      this.formStatus = 'Add';
    }

    /*let subCategoryData = {
      subCategory: 'subCategory1'
    }
      //console.log(categoryData);
      this.afs.collection('categories').add(categoryData).then(docRef => {
        console.log(docRef);

        //this.afs.doc(`categories/${docRef.id}`).collection('categories').add(subCategoryData)
        this.afs.collection('categories').doc(docRef.id).collection('subCategories').add(subCategoryData).then(docRef1 => {
          console.log(docRef1);

          //this.afs.doc(`categories/${docRef.id}/subCategories/${docRef1.id}`).collection('subsubcategories').add(subCategoryData)

          this.afs.collection('categories').doc(docRef.id).collection('subCategories').doc(docRef1.id).collection('subCategories').add(subCategoryData).then(docRef2 => {
            console.log('Second Level Subcategoty Successfully Added');
          })
        })
     })
      .catch(error => { console.log(error) }); */
  }

  //need 2 wayb data binding here '[(ngModel)]="formCategory")]'
  onEdit(category: any, id: any) {
    //console.log(category);
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }

  onDelete(id: any) {
    this.categoryService.deleteData(id);
  }

}
