import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Post, PostsService} from "../posts.service";
import {BehaviorSubject, Subject} from "rxjs";

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsPageComponent{
  posts: Post[] = [];
  private page = 0;
  private limit = 10;

  constructor(
    private postsService: PostsService,
    private changeDetection: ChangeDetectorRef
  ) {
  }

  getPosts() {
    this.postsService
      .getPosts(this.page, this.limit)
      .subscribe((posts) => {
        this.posts.push(...posts);
        this.changeDetection.detectChanges();
      })
  }

  cardsTrackBy(index: number, item: Post): string {
    return item.id;
  }

  onInView(d: boolean) {
    if (d)
      this.nextPage();
  }

  nextPage() {
    this.page = this.page + 1;
    this.getPosts();
  }
}
