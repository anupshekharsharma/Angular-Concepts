import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../appModels/employee.model';
import { DesignUtilityService } from '../appServices/design-utility.service';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.scss']
})
export class EmpComponent implements OnInit {
  item: Employee;
  editMode:any = false;

  constructor(private activatdRoute:ActivatedRoute,
              private _du:DesignUtilityService) { }

  ngOnInit(): void {

    this.activatdRoute.paramMap.subscribe(param=>{
      let pid = +param.get('id') // (+) Converts string 'id' to number
      this._du.fetchSingleEmployee(pid-1).subscribe(res=>{
        // console.log(res)
        this.item = res;
      })

      this.activatdRoute.queryParamMap.subscribe(qParam=>{
        console.log(qParam.get('editMode'))
        this.editMode = qParam.get('editMode');
      })
    })

    


 
  }

}
