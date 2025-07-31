import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
     LoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
     FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
