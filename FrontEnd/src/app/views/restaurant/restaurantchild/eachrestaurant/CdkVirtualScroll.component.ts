import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RestaurantService } from '../../../../services/restaurant.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-cdkvirtualscroll',
  template: `
    <cdk-virtual-scroll-viewport itemSize="50" class="example-viewport">
        <div *cdkVirtualFor="let item of ds; templateCacheSize: 0" class="example-item">
            {{ item.o_tlc_agency_name || 'Loading...'}}
        </div>
    </cdk-virtual-scroll-viewport>`,
  styles: ['.example-viewport { height: 200px; width: 50%;border: 1px solid black;} .example-item {height: 50px;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CdkVirtualScrollDataSourceExample {
  constructor(private restaurantService: RestaurantService) 
  { }
  ds = new MyDataSource(this.restaurantService);
}
export class MyDataSource extends DataSource<string | undefined> {
  private pageSize = 10000;
  private initialData : any[] = [{
    o_tlc_agency_address: "臺北市內湖區文湖街15號",
    o_tlc_agency_admincategory: "",
    o_tlc_agency_category: "1",
    o_tlc_agency_categorychild: "小學",
    o_tlc_agency_email: "",
    o_tlc_agency_fax: "(02)2799-4445",
    o_tlc_agency_img_front: "",
    o_tlc_agency_img_inner: "",
    o_tlc_agency_link: "http://www.whups.tp.edu.tw",
    o_tlc_agency_name: "臺北市內湖區文湖國民小學",
    o_tlc_agency_opentime: "",
    o_tlc_agency_phone: "(02)2658-3515",
    o_tlc_agency_purpose: "",
    o_tlc_agency_region: "8",
    o_tlc_agency_service: "",
    _id: 100
  }]
  private fetchedPages = new Set<number>();
  private dataStream = new BehaviorSubject<(string | undefined)[]>(this.initialData)
  private subscription = new Subscription();
  constructor(private restaurantService: RestaurantService) {
    super();
  }
  connect(collectionViewer: CollectionViewer): Observable<(string | undefined)[]> {
    this.subscription.add(collectionViewer.viewChange.subscribe((range) => {
      console.log(range.start);
      console.log(range.end);
      const startPage = this.getPageForIndex(range.start);
      const endPage = this.getPageForIndex(range.end - 1);
      for (let i = startPage; i <= endPage; i++) {
        this.fetchPage(i);
      }
    }));
    return this.dataStream;
  }
  disconnect(): void {
    this.subscription.unsubscribe();
  }
  
  private getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }
  private fetchPage(page: number) {
    if (this.fetchedPages.has(page)) {
      return;
    }
    this.fetchedPages.add(page);
    this.restaurantService.GetBigData()
        .subscribe((data) => {
            console.log('data.result.results is =>', data.result.results);
            this.dataStream.next(data.result.results);
        });
  }
}