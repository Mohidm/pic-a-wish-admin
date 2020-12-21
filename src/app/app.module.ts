import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './layouts/main/main.module';
import { AuthService } from './services/auth/auth.service';



@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
  
 
    
   
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
