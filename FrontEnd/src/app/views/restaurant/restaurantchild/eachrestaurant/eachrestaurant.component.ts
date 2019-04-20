import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-eachrestaurant',
  templateUrl: './eachrestaurant.component.html',
  styleUrls: ['./eachrestaurant.component.scss']
})
export class EachrestaurantComponent implements OnInit {
  selectedFile: File
  constructor(
    public dialog: MatDialog
  ){}

  ngOnInit() {
  }
  public openUploadDialog() {
    let dialogRef = this.dialog.open(DialogComponent, { width: '50%', height: '50%' });
  }
}
