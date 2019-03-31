import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DiscussService } from '../../../../services/discuss.service';

@Component({
  selector: 'app-classicpost',
  templateUrl: './classicpost.component.html',
  styleUrls: ['./classicpost.component.scss']
})
export class ClassicpostComponent implements OnInit {

  submitForm: Object ;

  constructor(
    private fb: FormBuilder,
    private discussService: DiscussService
  ) { }

  ngOnInit() {
  }

  profileForm = this.fb.group({
    name: ['',[Validators.required]],
    theme: ['',[Validators.required]],
    date:['',[Validators.required]],
    post:['',[Validators.required]]
  });

  get name() { return this.profileForm.get('name'); }
  get theme() { return this.profileForm.get('theme'); }
  get date() { return this.profileForm.get('date'); }
  get post() { return this.profileForm.get('post'); }

  onSubmit(){
    console.log(this.profileForm.value);
    console.log(this.profileForm.get('theme'));
    this.submitForm = {
      "rank":"1",
      "theme":this.profileForm.get('theme').value,
      "author":this.profileForm.get('name').value,
      "date":this.profileForm.get('date').value,
      "good": 0,
      "content":this.profileForm.get('post').value,
      "comments":[],
      "goodcount":'1'
    }
    console.log('交出去的 Form 是 =>', this.submitForm);
    this.discussService.AddClassicPost(this.submitForm)
      .subscribe((result) => {
        console.log(result);
      })
  }
}
