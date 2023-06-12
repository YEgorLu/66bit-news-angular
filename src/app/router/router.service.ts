import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  routes = [
    {text: 'Новости', routerLink: ''},
    {text: 'Тема', routerLink: '/theme'},
  ]
}

export interface Route {
  text: string;
  routerLink: string;
}
