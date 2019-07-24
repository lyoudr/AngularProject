import { Component, OnInit, Input,ViewChild, ComponentFactoryResolver } from '@angular/core';

import { AdDirective } from './chat_dynamic/ad.directive';
import { AdItem }      from './chat_dynamic/ad-item';
import { AdComponent } from './chat_dynamic/ad.component';
import { AdService } from './chat_dynamic/ad.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-big-data',
  templateUrl: './big-data.component.html',
  styleUrls: ['./big-data.component.scss']
})
export class BigDataComponent implements OnInit {
  ads : AdItem[];
  currentAdIndex = -1;
  @ViewChild(AdDirective) adHost : AdDirective;;
  open : Subject<boolean> = new Subject();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private adService : AdService
  ) { }

  ngOnInit() {
    this.ads = this.adService.getAds();
    this.Maskdetect();
  }

  loadComponent(componenttype, event:any) {
    this.open.next(true);
    // Define which component to load when clicking differenet button
    switch (componenttype){
      case 'chat':
        this.currentAdIndex = 0;
        break;
    }
    const adItem = this.ads[this.currentAdIndex];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).isClose.subscribe((result) => {
      console.log('result is =>', result);
      switch(result){
        case true:
          viewContainerRef.clear();
          this.open.next(false);
          break;
      }
    }); 
  }

  Maskdetect(){
    this.open.subscribe((result) => {
      if(result == true){
        document.addEventListener('click', function(event){
          console.log('event.target is =>', event.target);
          console.log('document.querySelector(".chat") is =>', document.querySelector('.chat'));
          if(!document.querySelector('.chat').contains(<HTMLElement>event.target)){
            console.log('not containe');
            event.preventDefault();
          }
        });
      }
    }); 
  }

  Console(){
    console.log('clicked');
  }
}
