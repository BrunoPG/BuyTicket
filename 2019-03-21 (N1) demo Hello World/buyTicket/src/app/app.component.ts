import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SlidesPage } from './slides/slides.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  //rootPage:string = 'slides';
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    }, 
    {
      title: 'Evento',
      url: '/evento',
      icon: 'calendar'
    },
    {
      title: 'Sala',
      url: '/sala',
      icon: 'apps'
    },
    /*{
      title: 'Setor',
      url: '/setor',
      icon: 'bookmark'
    },*/
    {
      title: 'Configurações',
      url: '/configuracoes',
      icon: 'ios-construct'
    },
    {
      title: 'Help',
      url: '/slides',
      icon: 'help'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
