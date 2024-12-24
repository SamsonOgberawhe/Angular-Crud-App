import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {EmpAddEditComponent} from "./emp-add-edit/emp-add-edit.component";
import {EmployeeService} from "./services/employee.service";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {CoreService} from "./core/core.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'crud-app';

  displayedColumns: string[] = [
    'id',
    'firstname',
    'lastname',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action'
  ]

  dataSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog,
              private _empService: EmployeeService,
              private _coreService: CoreService) {}

  ngOnInit(){
    this.getEmployees();
  }
  openAddEditDialog(){
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getEmployees();
        }
      }
    })
  }

  openEditForm(data: any){
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data: data
    })

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getEmployees();
        }
      }
    })
  }

  getEmployees(){
    this._empService.getEmployee().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(res);
      },
      error: (err => {

      })
    })
  }

  deleteEmployee(id: string){
    this._empService.deleteEmployee(id).subscribe({
      next: (val) => {
        // alert("Employee deleted!")
        this._coreService.openSnackBar('Employee deleted!', 'Done')
        this.getEmployees();
      },
      error: console.log
    })
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }
}
