import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGX_GRID_DIRECTIVES, IGX_LIST_DIRECTIVES, IgxIconComponent } from '@infragistics/igniteui-angular';
import { Subject, take, takeUntil } from 'rxjs';
import { CustomerDto } from '../models/northwind-swagger/customer-dto';
import { OrderDto } from '../models/northwind-swagger/order-dto';
import { NorthwindSwaggerService } from '../services/northwind-swagger.service';

@Component({
  selector: 'app-view-2',
  imports: [IGX_LIST_DIRECTIVES, IGX_GRID_DIRECTIVES, IgxIconComponent],
  templateUrl: './view-2.component.html',
  styleUrls: ['./view-2.component.scss']
})
export class View2Component implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  private _selectedCustomer?: CustomerDto;
  public get selectedCustomer(): CustomerDto | undefined {
    return this._selectedCustomer;
  }
  public set selectedCustomer(value: CustomerDto | undefined) {
    this._selectedCustomer = value;
    this.northwindSwaggerOrderDto$.next();
  }
  public northwindSwaggerCustomerDto: CustomerDto[] = [];
  public northwindSwaggerOrderDto: OrderDto[] = [];
  public northwindSwaggerOrderDto$: Subject<void> = new Subject<void>();

  constructor(
    private northwindSwaggerService: NorthwindSwaggerService,
  ) {}


  ngOnInit() {
    this.northwindSwaggerService.getCustomerDtoList().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.northwindSwaggerCustomerDto = data
    );
    this.northwindSwaggerService.getOrderDtoList(this.selectedCustomer?.customerId ?? '').pipe(takeUntil(this.destroy$)).subscribe(
      data => this.northwindSwaggerOrderDto = data
    );
    this.northwindSwaggerOrderDto$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.northwindSwaggerService.getOrderDtoList(this.selectedCustomer?.customerId ?? '').pipe(take(1)).subscribe(
        data => this.northwindSwaggerOrderDto = data
      );
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.northwindSwaggerOrderDto$.complete();
  }
}
