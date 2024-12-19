import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, EarnedLeave, Employee } from '../model/master';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl: string = "https://projectapi.gerasim.in/api/EmployeeManagement/";

  loggedUserData: any;

  constructor(private http: HttpClient) { 
    const localData = localStorage.getItem("leaveUser");
    if(localData){
      this.loggedUserData = JSON.parse(localData);
    }
  }

  getDepartment() : Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "GetParentDepartment");
  }

  getChildDepartmentByParentId(id: string) : Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "GetChildDepartmentByParentId?deptId" + id);
  }

  createEmployee(obj: Employee) : Observable<Employee>{
    return this.http.post<Employee>(`${this.apiUrl}CreateEmployee`, obj)
  }

  getAllEmployee() : Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl + "GetAllEmployees")
  }

  getAllChildDepartment() : Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "GetAllChildDepartment")
  }

  deleteEmployee(id:number) : Observable<Employee>{
    return this.http.delete<Employee>(this.apiUrl + "DeleteEmployee/" + id)
  }

  updateEmployee(emp: Employee) : Observable<Employee>{
    return this.http.put<Employee>(this.apiUrl + "UpdateEmployee/" + emp.employeeId, emp)
  }

  addEarnedLeave(emp: EarnedLeave) : Observable<APIResponse>{
    return this.http.post<APIResponse>(this.apiUrl + "AddNewEarnedLeave", emp)
  }

  getAllEarnedLeaves() : Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "GetAllEarnedLeaves");
  }


  

}
