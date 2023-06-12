import {Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';

@Directive({
  selector: '[inView]'
})
export class InViewDirective implements OnInit {
  @Output() inView: EventEmitter<boolean> = new EventEmitter<boolean>();
  private observer!: IntersectionObserver;

  constructor(
    private el: ElementRef
  ) {
  }

  ngOnInit(): void {
    this.observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => this.inView.emit(entry.isIntersecting));
    })
    this.observer.observe(this.el.nativeElement);
  }
}
