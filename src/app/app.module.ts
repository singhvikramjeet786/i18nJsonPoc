import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';


export function initApp(http: HttpClient, translate: TranslateService){
  return ()=> new Promise<boolean>((resolve:(res:boolean)=> void) =>{
      const defaultLocale = 'en';
      http.get(`/assets/i18n/dev.json`).pipe(
        catchError(()=> of(null))
      ).subscribe((devKeys:any) =>{
        translate.setTranslation(defaultLocale,devKeys || {});
        translate.setDefaultLang(defaultLocale);
        translate.use(defaultLocale);

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
