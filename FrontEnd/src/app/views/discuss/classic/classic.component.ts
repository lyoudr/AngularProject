import { Component, OnInit } from '@angular/core';
import { DiscussService } from '../../../services/discuss.service';

@Component({
  selector: 'app-classic',
  templateUrl: './classic.component.html',
  styleUrls: ['./classic.component.scss']
})
export class ClassicComponent implements OnInit {
  pagenumber: number ;
  discuss: any;
  discussions: any;
  classicinfo: any;
  classicInformations: any;

  constructor( 
    private discussService : DiscussService
  ) { }

  ngOnInit() {
    this.Getdiscussion(1);
  }

  /* Get Discussions */
  Getdiscussion(number){
    this.pagenumber = number;
    this.discussService.Getdiscussion(this.pagenumber)
      .subscribe((discuss) =>{
        console.log('得到的討論是 =>', discuss);
        this.discuss = discuss;
        this.discussions = this.discuss;
      })
  }

  /* Get Each Discuss Information */
  GetdiscussInfo(index){
    console.log('index is =>',index);
    this.discussService.GetdiscussInfo(index)
      .subscribe((classicinfo)=>{
        console.log('得到的每個音樂家資料', classicinfo)
        this.classicinfo = classicinfo;
        this.classicInformations = this.classicinfo;
      })  
  }
}
