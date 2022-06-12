import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MatIconModule} from "@angular/material/icon";
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {Routes, RouterModule} from "@angular/router";
import {MainPageComponent} from './components/main-page/main-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutMeComponent } from './components/about-me/about-me.component';

const routes: Routes = [
  {path: 'main-page', component: MainPageComponent},
  {path: 'about-me', component: AboutMeComponent},
  {path: '', redirectTo: 'main-page', pathMatch: 'full'},
  {path: '**', redirectTo: 'main-page', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    MainPageComponent,
    AboutMeComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
