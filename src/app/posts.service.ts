import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {
  ArgumentOutOfRangeError,
  catchError,
  map,
  Observable,
  of,
  Subject
} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private appId = '647dcc5338f95cc54ee5875b'
  private options = {
    headers: {['app-id']: this.appId}
  };
  private baseUrl = 'https://dummyapi.io/data/v1/';
  private readonly errors$!: Subject<string>;

  constructor(
    private http: HttpClient
  ) {
    this.errors$ = new Subject<string>();
  }

  getPosts(page: number, limit: number): Observable<Post[]> {
    if (page < 0 || page > 999)
      throw new ArgumentOutOfRangeError();
    if (limit < 5 || limit > 50)
      throw new ArgumentOutOfRangeError();

    const params = new URLSearchParams({page: page.toString(), limit: limit.toString()}).toString()
    const url = `${this.baseUrl}post`
    return this.http.get<ResponsePostsData>(params === '' ? url : `${url}?${params}`, this.options)
      .pipe(
        map(this.transformToPosts),
        catchError(this.handleError.bind(this))
      )
  }

  getErrors(): Subject<string> {
    return this.errors$;
  }

  private transformToPosts(response: ResponsePostsData): Post[] {
    return response?.data.map((d) => ({
      id: d.id,
      header: `${d.owner.firstName} ${d.owner.lastName}`,
      content: d.text
    }))
  }

  private handleError(err: HttpErrorResponse): Observable<Post[]> {
    this?.errors$.next(err.message);
    return of([]);
  }
}

export interface Post {
  id: string;
  header: string;
  content: string;
}

interface ResponsePostsData {
  data: ResponsePost[],
  limit: number,
  page: number,
  total: number
}

interface ResponsePost {
  id: string;
  owner: {
    firstName: string;
    lastName: string;
  };
  text: string;
}
