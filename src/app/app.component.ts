import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titleVar = 'i18nJsonPoc & dynamic-translations';
  testArr = [];
  constructor(translate: TranslateService){
    translate.get('test1.table').subscribe((data:any)=> {
      console.log(data);
      this.testArr = data;
      console.log("this.testArr :",this.testArr[0]['tr']['th1']);
     });
  }
  /**
   * method to update webPage with selected language.
   * @param langCode 
   */
  changeLanguage(langCode:string){
    localStorage.setItem("locale",langCode);
    window.location.reload();
  }
}
