import { Component, OnInit } from '@angular/core';
import { Employee } from '../appModels/employee.model';
import { DesignUtilityService } from '../appServices/design-utility.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.scss']
})
export class EmpComponent implements OnInit {
  item: Employee;
  editMode:any = false;

  constructor(private _designUtility: DesignUtilityService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params =>{
      this._designUtility.fetchSingleEmployee(params.get('id')).subscribe(resp=>{
        this.item =  resp 
        console.log(resp)
      })
    })

    this.activatedRoute.queryParamMap.subscribe(qParam=>{
      console.log(qParam.get('editMode'))
      this.editMode = qParam.get('editMode');
      // this._designUtility.fetchSingleEmployee(qParam.get('id')).subscribe(resp=>{
      //   this.item =  resp 
      // })
    })

    // this.activatedRoute.paramMap.subscribe(params =>{
    //   console.log(params.get('id'));
    //   // this.item = this._designUtility.empData[res.id - 1];
      
    //   this._designUtility.fetchSingleEmployee(params.get('id')).subscribe(resp=>{
    //     console.log(resp);
    //     this.item =  resp 
    //   })
    // })


  }

}
