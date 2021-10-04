import { Component, Input } from '@angular/core';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import {MenuModule} from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  path = ROUTER_UTILS.config.base;
  @Input() items: MenuItem[];

  constructor(

  ) {
    this.items = [
      { label: 'New', icon: 'pi pi-fw pi-plus' },
      { label: 'Open', icon: 'pi pi-fw pi-download' },
      { label: 'Undo', icon: 'pi pi-fw pi-refresh' }
    ];
  }
  ngOnInit(): void {
  
  }

}
