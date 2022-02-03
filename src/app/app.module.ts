import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from './translate.module';
import { TranslateService } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';

export const ROOT_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./lazy-module-1/lazy-module-1.module').then(module => module.LazyModule1Module),
  },
];

export interface AppLanguage {
  id: string;
}

export const languageOptions: ({
  title: string;
  flag: string;
} & AppLanguage)[] = [
  {
    id: 'en',
    title: 'English',
    flag: 'gb',
  },
  {
    id: 'fr',
    title: 'French',
    flag: 'fr',
  },
  {
    id: 'de',
    title: 'German',
    flag: 'de',
  },
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROOT_ROUTES),
    TranslateModule.forRoot('en', languageOptions),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(languageOptions.map((o) => o.id));
  }
}
