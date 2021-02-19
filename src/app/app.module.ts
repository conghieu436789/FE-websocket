import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RegisterComponent} from './components/register/register.component';
import {CreateComponent} from './components/product/create/create.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {ProductComponent} from './components/product/product.component';
import {ListComponent} from './components/product/list/list.component';
import {EditComponent} from './components/product/edit/edit.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AuthService} from './service/auth.service';
import {TokenStorageService} from './token/token-storage.service';
import {JWT_OPTIONS, JwtHelperService, JwtInterceptor} from '@auth0/angular-jwt';
import {AuthInterceptorService} from './service/auth-interceptor.service';
import {ProductService} from './service/product.service';
import { SocketComponent } from './components/socket/socket.component';
// import {ScannerComponent} from './components/socket/scanner/scanner.component';
// import {ScannerService} from './service/scanner.service';
import {MessageService} from './service/message.service';
import {UserService} from './service/user.service';
import {ChatMessageService} from './service/chat-message.service';
import {ChatRoomService} from './service/chat-room.service';
import {NotificationService} from './service/notification.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ProductComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    SocketComponent,
    // ScannerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AuthService,
    TokenStorageService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    ProductService,
    UserService,
    MessageService,
    ChatMessageService,
    ChatRoomService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
