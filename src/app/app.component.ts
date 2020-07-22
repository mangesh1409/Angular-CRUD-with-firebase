import { Component } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { FormBuilder, Validators } from '@angular/forms';
import { studentData } from './studentData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'CRUDwithFirebase';
  collection: any = [];
  gettingStatus:boolean=true;
  update:boolean;updateId;
  addMessege:boolean;
  deleteMessege:boolean;
  updateMessage:boolean;

  constructor(private fb:FormBuilder,private _service:FirebaseService) {  }

  admForm= this.fb.group({
    name:['',[Validators.required,Validators.minLength(2)]],
    email:['',[Validators.required,Validators.email]],
    phone:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
    batch:['',[Validators.required]]
  })
  ngOnInit(): void {
    this._service.getAllData().subscribe((result)=>{
        // console.log(result);
        this.collection=result;
        this.gettingStatus=false;
    });
  }
  sendData(userData:studentData){
    if(this.update){
       console.log(this.updateId);
      //console.log('https://admissionportal-5e8cf.firebaseio.com/studentDetails/'+this.updateId+'.json');
      //console.group(userData);
      this._service.updateEntry(this.updateId,userData).subscribe((result)=>{
        // console.log("Update data",result);
        this.gettingStatus=true;
        this.updateMessage=true;
        this.admForm.reset();
        this.ngOnInit();
        this.update=false;
      })
      setTimeout(() => {
        this.updateMessage=false;
      },3000);
    }
    else{
      // console.log(userData);
      this._service.sendNewEntry(userData).subscribe((result)=>{
      // console.log(result);
        this.gettingStatus=true;
        this.addMessege=true;
        this.admForm.reset();
        this.ngOnInit();
      })
      setTimeout(() => {
        this.addMessege=false;
      },3000);
    }
  }
  deleteEntry(id){
    if(confirm("Do you want to delete ?")){
      // console.log(id);
      this._service.deleteEntry(id).subscribe((result)=>{
        // console.log("Data deleted",result);
        this.gettingStatus=true;
        this.deleteMessege=true;
        this.ngOnInit();
      });
      setTimeout(() => {
        this.deleteMessege=false;
      },3000);
    }
  }
  getDataToUpdate(id,index){
    this.updateId=id;
    // console.log(id);
    // console.log(this.collection[index]);
    console.log(this.collection[index].name);
    this.admForm.setValue({
      name:this.collection[index].name,
      email:this.collection[index].email,
      phone:this.collection[index].phone,
      batch:this.collection[index].batch
    })
    this.update=true;
  }

}
