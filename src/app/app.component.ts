import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "./posts.service";
import {Subscription} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ThemeService} from "./themes/theme.service";
import {RouterService, Route} from "./router/router.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  errorsSub!: Subscription;
  isMobile!: boolean;
  isMobileSub!: Subscription
  buttons: Route[];

  constructor(
    private postsService: PostsService,
    private snackBar: MatSnackBar,
    private themeService: ThemeService,
    routerService: RouterService) {
    this.buttons = routerService.routes;
  }

  show(text: string) {
    if (text)
      this.snackBar.open(text, 'Закрыть', {duration: 5000});
  }

  ngOnDestroy(): void {
    this.errorsSub.unsubscribe();
    this.isMobileSub.unsubscribe();
  }

  ngOnInit(): void {
    this.errorsSub = this.postsService.getErrors().subscribe((err) => this.show(err));
    this.isMobileSub = this.themeService.isMobile.subscribe((val) => this.isMobile = val);
  }

}
