import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, ActivatedRoute } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CadastroSalaPageModule } from './cadastro-sala/cadastro-sala.module';
import { CadastroSetorPageModule } from './cadastro-setor/cadastro-setor.module';
import { HttpModule } from '@angular/http';
import { CadastroEventoPageModule } from './cadastro-evento/cadastro-evento.module';
import { HttpClientModule } from '@angular/common/http';
import { BuyAssentoComponent } from './buy-assento/buy-assento.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    CadastroSalaPageModule,
    CadastroSetorPageModule,
    CadastroEventoPageModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
