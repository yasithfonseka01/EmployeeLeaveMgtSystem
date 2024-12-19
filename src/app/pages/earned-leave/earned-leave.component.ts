import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe} from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { APIResponse, EarnedLeave, Employee } from '../../model/master';
import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-earned-leave',
  imports: [CommonModule, ReactiveFormsModule, AsyncPipe, DatePipe],
  templateUrl: './earned-leave.component.html',
  styleUrl: './earned-leave.component.scss'
})
export class EarnedLeaveComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  employee$: Observable<Employee[]>;
  masterSrv = inject(MasterService);

  earnedLeaves: EarnedLeave[] = [];

  constructor(){
    this.initializerForm();
    this.employee$ = this.masterSrv.getAllEmployee();
    // this.employee$ = this.masterSrv.getAllEmployee().pipe(
    //   catchError(error => {
    //     console.error('Error fetching employees', error);
    //     return of([]); // Return an empty array in case of error
    //   })
    // );
    console.log("get alllll,", this.employee$)
  }

  ngOnInit(): void {
      this.onData();
  }

  initializerForm(){
    this.form = new FormGroup({
      earnedLeaveId: new FormControl(0),
      employeeId: new FormControl(0),
      totalEarnedLeaves: new FormControl(0),
      totalSickEarnedLeaves: new FormControl(0),
      lastUpdatedDate: new FormControl(new Date()),
    })
  }

  onData(){
    const formValue = this.form.value;
    this.masterSrv.getAllEarnedLeaves().subscribe((res:APIResponse)=>{
      this.earnedLeaves = res.data;
    })
  }

  onSave(){
    const formValue = this.form.value;
    this.masterSrv.addEarnedLeave(formValue).subscribe((res:APIResponse)=>{
      if(res.result){
        this.onData();
        alert("Leave Modified")
      }else{
        alert(res.message)
      }
    })
  }

}




