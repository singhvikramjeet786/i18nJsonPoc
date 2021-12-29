import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titleVar = 'i18nJsonPoc & dynamic-translations';

  /**
   * method to update webPage with selected language.
   * @param langCode 
   */
  changeLanguage(langCode:string){
    localStorage.setItem("locale",langCode);
    window.location.reload();
  }
}
