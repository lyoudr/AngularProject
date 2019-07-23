import { Injectable }  from '@angular/core';
import { ChatComponent } from './chat.component';
import { AdItem } from './ad-item';

@Injectable()
export class AdService {
  getAds() {
    return [
      new AdItem(ChatComponent),
    ];
  }
}
