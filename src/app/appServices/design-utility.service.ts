import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Employee } from '../appModels/employee.model';

@Injectable({
  providedIn: 'root'
})
export class DesignUtilityService {

  url = 'https://global-b6f8e.firebaseio.com/empData.json'
  constructor(private http: HttpClient) {
 
  }
   
  saveData2(data){
    return this.http.post('https://global-b6f8e.firebaseio.com/empData.json', data)
  } 
  fetchData2(){
    return this.http.get<Employee>('https://global-b6f8e.firebaseio.com/empData.json')
    .pipe(map(resData=>{
      const userArray = [];
      for(const key in resData){
        if(resData.hasOwnProperty(key)){
          userArray.push({userId:key, ...resData[key]})
        }
      }
      return userArray
    }))
  }
  fetchSingleEmployee(id){
    return this.http.get<Employee>('https://global-b6f8e.firebaseio.com/empData/'+ id+'.json')
  }

  deleteEmployee(userId){
    if(confirm('Do you want to delete this user?')){
      console.log(userId);
      return this.http.delete('https://global-b6f8e.firebaseio.com/empData/'+userId+'.json')
    }
  }


  // empData = [
  //   { id: 1, name: 'Anup', designation: 'Frontend Developer', dept: 'Development', status: 'Active'},
  //   { id: 2, name: 'Shekhar', designation: 'Angular Developer', dept: 'Development', status: 'Active'},
  //   { id: 3, name: 'John', designation: 'Web Designer', dept: 'Design', status: 'Active'},
  //   { id: 4, name: 'Alex', designation: 'Java Developer', dept: 'Development', status: 'Inactive'},
  //   { id: 5, name: 'Donald', designation: 'Hr Manager', dept: 'Hr', status: 'Active'},
  //   { id: 6, name: 'Sam', designation: 'Admin Manager', dept: 'Admin', status: 'Active'}
  // ]

   
}
