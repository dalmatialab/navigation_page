import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, Validators } from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { Service } from 'src/app/Service';
import { Color } from '@angular-material-components/color-picker';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  myForm: any // Form where data is stored after closing the dialog

  constructor(private dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Service, private fb: FormBuilder) {
    this.myForm = this.fb.group({ //Inject the data into dialog, and capture the data after save.Value is captured using "formControlName"
      name:[data.name, [Validators.required, Validators.maxLength(25)]],
      url:[data.url, Validators.required],
      tileColor:[new Color(data.tileColor.red,data.tileColor.green,data.tileColor.blue),Validators.required],
      fontColor:[data.fontColor, Validators.required],
      iconType:[data.iconType, [Validators.required, Validators.maxLength(50)]]
    })
  }

  ngOnInit(): void {
  }

  iconHelper(){
    window.open("https://fonts.google.com/icons?selected=Material+Icons", "_blank"); // Links to Google Font icons
  }

  close(){
    this.dialogRef.close(); // Close the dialog
  }
  save(){
    if(this.myForm.valid){
      var rgbcolor = { // Parse Color object to Service tileColor object
        "red": this.myForm.value.tileColor.r,
        "green": this.myForm.value.tileColor.g,
        "blue": this.myForm.value.tileColor.b
      }
      this.myForm.value.tileColor=rgbcolor

      this.dialogRef.close(this.myForm.value) // Pass value after dialog is closed
    }
  }

}
