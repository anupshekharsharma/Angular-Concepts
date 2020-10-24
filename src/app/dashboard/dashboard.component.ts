import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DesignUtilityService } from '../appServices/design-utility.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
   
  

  constructor(
    private fb: FormBuilder, 
    private _designUtility: DesignUtilityService) {   
  }

  listViewActive = false;
  showModal = false;

  empForm : FormGroup;

  empData; 

  ngOnInit(): void {

    this.onFetchProduct();

    this.empForm = this.fb.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
      dept: ['Development', Validators.required],
      status: ['Active'],
    })
  }

  onEmpSubmit(){
    if(this.empForm.valid){
      console.log(this.empForm.value);
   
      console.log(this.empData)
      
      this.showModal = false;

      this._designUtility.saveData2(this.empForm.value).subscribe(()=>{
        this.onFetchProduct();
      });
      this.empForm.reset({
        dept: 'Development',
        status: 'Active',
      });

      


    }else{

      let key = Object.keys(this.empForm.controls);
      // console.log(key);

      key.filter(data =>{
        // console.log(data);
        let control = this.empForm.controls[data];
        // console.log(control);
        if(control.errors !=null){
          control.markAsTouched();
        }
      })
    }
  }


  onAddEmployee(){
    this.showModal = true;
  }
  onCloseModal(){
    this.showModal = false;
  }

 
  onFetchProduct(){
    this._designUtility.fetchData2()
    .subscribe(
      (response) => {
        const data = JSON.stringify(response)
        this.empData = response;
      },
      (err) => console.log(err)
    )
  }

  onDeleteEmployee(empId){
    console.log(empId)
    this._designUtility.deleteEmployee(empId).subscribe(()=>{
      this.onFetchProduct();
    })
  }

}
