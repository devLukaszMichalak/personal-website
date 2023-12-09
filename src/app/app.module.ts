import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutMeComponent } from './about-me/about-me.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ContactComponent } from './contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MyGitComponent } from './my-git/components/my-git.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [
  {path: 'main-page', component: MainPageComponent},
  {path: 'about-me', component: AboutMeComponent},
  {path: 'my-git', component: MyGitComponent},
  {path: 'contact', component: ContactComponent},
  {path: '', redirectTo: 'main-page', pathMatch: 'full'},
  {path: '**', redirectTo: 'main-page', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    MainPageComponent,
    AboutMeComponent,
    ContactComponent,
    MyGitComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    MatIconModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
