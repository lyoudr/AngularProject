import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { RestaurantService } from '../../../../services/restaurant.service';

@Component({
  selector: 'app-eachrestaurant',
  templateUrl: './eachrestaurant.component.html',
  styleUrls: ['./eachrestaurant.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EachrestaurantComponent implements OnInit {
  selectedFile: File;
  source: HTMLImageElement;
  items: any ;
  originalitem : any;

  constructor(
    public dialog: MatDialog,
    private restaurantService : RestaurantService
  ){}

  ngOnInit() {
    //this.GetBigData();
  }
  public openUploadDialog() {
    let dialogRef = this.dialog.open(DialogComponent, 
      { width: '50%', height: '50%' , data : { source: this.source }}
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log('The result is =>', result);
      this.source = result;
      this.source.className = 'img-fluid';
      let newDIV = document.createElement('div');
      newDIV.className = 'mb-3 pics animation all 2';
      newDIV.appendChild(this.source);
      document.getElementById('gallery').appendChild(newDIV);
    });
  }

  /*public GetBigData(){
    this.restaurantService.GetBigData()
      .subscribe((data) => {
        console.log('returned data is =>', data);
        this.originalitem = data;
        console.log('data.results is =>', this.originalitem.result.results);
        this.items = this.originalitem.result.results;
      })
  }*/

  //items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  
}
