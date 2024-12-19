import { Component, inject, OnInit } from '@angular/core';
import { APIResponse, ChildDept, Employee, ParentDept } from '../../model/master';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-employee',
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit {

  employeeObj:Employee = new Employee();
  parentDepId:string = '';
  masterSrv = inject(MasterService);
  parentDepartmentList: ParentDept [] = [];
  childDepartmentList: ChildDept [] = [];
  allEmployeeList: Employee [] = [];
  getChildList: Employee [] = [];

  ngOnInit(): void {
    this.loadEmployee();
      this.loadParentDept();
  }

  loadParentDept(){
    this.masterSrv.getDepartment().subscribe((res:APIResponse)=>{
      this.parentDepartmentList = res.data;
    })
  }

  loadEmployee(){
    this.masterSrv.getAllEmployee().subscribe((res:Employee[])=>{
      this.allEmployeeList = res;
    })
  }

  getAllChild(){
    this.masterSrv.getAllChildDepartment().subscribe((res:APIResponse)=>{
      this.childDepartmentList = res.data;
    })
  }

  onDeptChange(){
    this.masterSrv.getChildDepartmentByParentId(this.parentDepId).subscribe((res:APIResponse) => {
      this.childDepartmentList =res.data;
    })
  }

  onSaveEmployee(){
    this.masterSrv.createEmployee(this.employeeObj).subscribe((res:Employee)=>{
        alert("Employee Created successfully");
        this.employeeObj = new Employee();
    })
  }

  onUpdateEmployee(){
    this.masterSrv.updateEmployee(this.employeeObj).subscribe((res:Employee)=>{
        alert("Employee updated successfully");
        this.employeeObj = new Employee();
    })
  }

  onEdit(item: Employee){
    this.employeeObj = item;
    console.log(this.employeeObj, "testt")
    this.getAllChild();
  }

  onDelete(id:number){
    const isDelete = confirm("Are you sure yu want to delete?");
    if(isDelete){
      this.masterSrv.deleteEmployee(id).subscribe((res:Employee)=>{
        this.loadEmployee();
      })
    }
  }
}
