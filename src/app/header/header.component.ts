import {Component, Input} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {RouterService, Route} from "../router/router.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() sideNav?: MatDrawer | undefined;
  buttons!: Route[];

  constructor(
    routerService: RouterService
  ) {
    this.buttons = routerService.routes;
  }
}
