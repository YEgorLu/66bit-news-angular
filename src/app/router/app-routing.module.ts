import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ThemePageComponent} from "../theme-page/theme-page.component";
import {NewsPageComponent} from "../news-page/news-page.component";
import {RouterService} from "./router.service";

const _routes: Routes = [
  {path: '', component: NewsPageComponent},
  {path: 'theme', component: ThemePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(_routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
