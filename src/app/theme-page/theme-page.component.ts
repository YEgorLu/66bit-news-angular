import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ThemeService} from "../themes/theme.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-theme-page',
  templateUrl: './theme-page.component.html',
  styleUrls: ['./theme-page.component.scss']
})
export class ThemePageComponent implements OnInit, OnDestroy {
  themes!: string[];
  ext!: string;
  light!: boolean;
  rowspan!: number;
  isMobile!: boolean;
  private isMobileSub!: Subscription;

  get cols(): number {
    return this.isMobile ? 1 : 2;
  }

  toggleExt(): void {
    this.light = !this.light;
    const ext = this.light ? 'light' : 'dark';
    this.themeService.setExt(ext);
    this.changeDetection.detectChanges();
  }

  constructor(
    private themeService: ThemeService,
    private changeDetection: ChangeDetectorRef
  ) {
    this.themes = themeService.themeNames;
    this.ext = themeService.lastExt;
    this.light = this.ext === 'light';
    this.rowspan = (this.themes.length * (1 + +!this.isMobile)) / 2;
  }

  setThemeName(themeName: string) {
    this.themeService.setThemeName(themeName);
  }

  ngOnDestroy(): void {
    this.isMobileSub.unsubscribe();
  }

  ngOnInit(): void {
    this.isMobileSub = this.themeService.isMobile.subscribe((val) => {
      if (this.isMobile !== val) {
        this.isMobile = val
        this.changeDetection.detectChanges();
      }
    });
  }
}
