import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {EmpAddEditComponent} from "./emp-add-edit/emp-add-edit.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud-app';

  constructor(private _dialog: MatDialog) {}

  openAddEditDialog(){
    this._dialog.open(EmpAddEditComponent);
  }

  closeAddEditDialog(){
    this._dialog.closeAll();
  }
}
