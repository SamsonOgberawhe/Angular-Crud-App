import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EmployeeService} from "../services/employee.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoreService} from "../core/core.service";
@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit{

  empForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'
  ];

  constructor(private _fb: FormBuilder,
              private _empService: EmployeeService,
              private _dialogRef: MatDialogRef<EmpAddEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _coreService: CoreService) {
    this.empForm = this._fb.group({
      firstname: '',
      lastname: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    })
  }

  ngOnInit(){
    this.empForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            // alert("Employee added successfully");
            this._coreService.openSnackBar('Employee Updated!', 'Done')

            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err)
          }
        })
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            // alert("Employee added successfully");
            this._coreService.openSnackBar('Employee saved!', 'Done')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err)
          }
        })
      }
      console.log(this.empForm.value);
    }
  }
}
