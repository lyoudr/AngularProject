import { Component, OnInit } from '@angular/core';
import { DiscussService } from '../../../services/discuss.service';
import { FormBuilder, Validators } from '@angular/forms';

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
  switching :boolean = true;
  shouldSwitch : boolean;
  goodstatus : boolean = false;
  goodcount : number;
  toggle: boolean = true;
  eachpostID: any; 
  currentClass = "fa fa-heart-o fa-lg mt-4";
  index : number ;

  constructor( 
    private discussService : DiscussService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.Getdiscussion(1);
    this.GetdiscussInfo(1);
  }

  /* Form Build */
  profileForm = this.fb.group({
    post:['',[Validators.required]]
  });

  get post() { return this.profileForm.get('post'); }

  onSubmit(){
    console.log('留言是 =>',this.profileForm.value);
    let posts = {
      id : this.eachpostID,
      comment: this.profileForm.get('post').value
    };
    this.discussService.AddComments(posts)
      .subscribe((response) => {
        console.log('新增貼文後的回覆是 =>', response);
      });
    this.classicInformations.comments.push(this.profileForm.get('post').value);
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

  /* Get Each Discuss Information and Reply*/
  GetdiscussInfo(index){
    console.log('index is =>',index);
    this.index = index;
    this.discussService.GetdiscussInfo(index)
      .subscribe((classicinfo)=>{
        console.log('得到的每個音樂家資料', classicinfo)
        this.classicinfo = classicinfo;
        this.classicInformations = this.classicinfo;
        console.log('每個貼文的 id 是 =>', this.classicInformations.id);
        this.eachpostID = this.classicInformations.id;
      })  
  }

  /* Rank up according 讚數 */
  Rank(direction){
    console.log('Clicked!!');
    this.switching = true;
    while(this.switching){
      this.switching = false;
      for (var i = 0; i < (this.discussions.length - 1) ;i++ ){
        this.shouldSwitch = false;
        var x = Number(this.discussions[i].good);
        var y = Number(this.discussions[i + 1].good);
        console.log('x is =>', x);
        console.log('y is =>', y);
        if(direction == 1) {
          if(x < y){
            this.shouldSwitch = true;
            break;
          } 
        } else if (direction == 2 ){
          if (x > y){
            this.shouldSwitch = true;
            break;
          }
        }
      }
      if (this.shouldSwitch) {
        this.discussions[i] = this.discussions.splice((i+1),1, this.discussions[i])[0];
        this.switching = true;
      }
    }
  }
  
  Rankdate(direction){
    this.switching = true;
    while(this.switching){
      this.switching = false;
      for (var i = 0; i < (this.discussions.length - 1) ; i++){
        this.shouldSwitch = false;
        var x = (new Date(this.discussions[i].date)).getTime();
        var y = (new Date(this.discussions[i + 1].date)).getTime();
        console.log('x is =>', x);
        console.log('y is =>', y);
        if(direction == 1) {
          if(x < y){
            this.shouldSwitch = true;
            break;
          } 
        } else if (direction == 2 ){
          if (x > y){
            this.shouldSwitch = true;
            break;
          }
        }
      }
      if (this.shouldSwitch) {
        this.discussions[i] = this.discussions.splice((i+1),1, this.discussions[i])[0];
        this.switching = true;
      }
    }
  }

  /* Set good status */
  SetGoodstatus(){
    this.goodstatus = !this.goodstatus;
    if( this.goodstatus == true ){
      this.currentClass = "fa fa-heart fa-lg mt-4";
      this.goodcount = 1;
    } else {
      this.currentClass = "fa fa-heart-o fa-lg mt-4";
      this.goodcount = -1;
    }
    this.discussService.AddGood(this.eachpostID, this.goodcount)
      .subscribe({
        next(result){ console.log('Response is =>', result) },
        error(msg){ console.log('Error is =>', msg) }
      })
  }
}
