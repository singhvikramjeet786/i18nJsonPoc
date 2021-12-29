import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


export function initApp(http: HttpClient, translate: TranslateService){
  return ()=> new Promise<boolean>((resolve:(res:boolean)=> void) =>{
      const defaultLocale = 'en';
      const translationUrl = '/assets/translations';
      const sufix = '.json';
      const storageLocale = localStorage.getItem('locale');
      const locale = storageLocale || defaultLocale;

      forkJoin([
        http.get(`/assets/i18n/dev.json`).pipe(
          catchError(()=> of(null))
        ),
        http.get(`${translationUrl}/${locale}${sufix}`).pipe(
          catchError(()=> of(null))
        )
      ])
      .subscribe((response:any[]) =>{
        const devKeys = response[0];
        const translateKeys= response[1];
        
        translate.setTranslation(defaultLocale,devKeys || {});
        translate.setTranslation(locale, translateKeys || {}, true);

        translate.setDefaultLang(defaultLocale);
        translate.use(locale);
        resolve(true);
      });
  });
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot()
  ],
  providers: [{
    provide:APP_INITIALIZER,
    useFactory:initApp,
    deps:[HttpClient,TranslateService],
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
