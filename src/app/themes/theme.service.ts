import {Inject, Injectable, OnDestroy} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {BehaviorSubject, Subject, Subscription} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnDestroy{
  themeNames = ['indigo', 'grey', 'orange'];
  themeExts = ['dark', 'light'];
  currentName!: BehaviorSubject<string>;
  currentExt!: BehaviorSubject<string>;
  isMobile!: BehaviorSubject<boolean>;
  private doc: HTMLElement;
  private storageKey = 'app-theme';
  private breakpointSub!: Subscription;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private breakPointObserver: BreakpointObserver
  ) {
    this.doc = document.documentElement;
    this.currentExt = new BehaviorSubject<string>(this.lastExt);
    this.currentName = new BehaviorSubject<string>(this.lastThemeName);
    this.initTheme();
    this.isMobile = new BehaviorSubject(false);
    this.breakpointSub = breakPointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((breakpoint) => {
      this.isMobile.next(breakpoint.matches)
    })
  }

  ngOnDestroy(): void {
    this.breakpointSub.unsubscribe();
  }

  setExt(lightDark: string) {
    this.setTheme(this.currentName.value, lightDark);
    this.currentExt.next(lightDark);
  }

  setThemeName(themeName: string) {
    this.setTheme(themeName, this.currentExt.value);
    this.currentName.next(themeName);
  }

  setTheme(name: string, ext: string) {
    const theme = `${name}-${ext}`;
    if (theme === this.lastTheme)
      return;
    this.doc.classList.remove(this.lastTheme);
    this.doc.classList.add(theme);
    this.lastTheme = theme;
  }

  private getExtFromStr(fullTheme: string): string {
    const words = fullTheme.split('-');
    const ext = words[words.length - 1];
    if (ext !== 'light' && ext !== 'dark')
      throw new Error('Че-то не так с темой')
    return ext;
  }

  private getNameFromStr(fullTheme: string): string {
    const words = fullTheme.split('-');
    return words.slice(0, words.length - 1).join('');
  }

  private initTheme(): void {
    this.doc.classList.add(this.lastTheme);
  }

  get lastExt(): string {
    return this.getExtFromStr(this.lastTheme);
  }

  private get lastTheme(): string {
    let theme = localStorage.getItem(this.storageKey);
    if (!theme) {
      theme = `${this.themeNames[0]}-${this.themeExts[0]}`;
      this.lastTheme = theme;
    }

    return theme;
  }

  private set lastTheme(themeName: string) {
    localStorage.setItem(this.storageKey, themeName)
  }

  private get lastThemeName(): string {
    return this.getNameFromStr(this.lastTheme);
  }
}

