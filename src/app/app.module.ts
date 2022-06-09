import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MatIconModule} from "@angular/material/icon";
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {Routes, RouterModule} from "@angular/router";
import {MainPageComponent} from './components/main-page/main-page.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    MainPageComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
