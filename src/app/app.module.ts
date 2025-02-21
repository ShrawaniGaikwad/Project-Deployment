import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ContactComponent } from './contact/contact.component';
import { HelpComponent } from './help/help.component';
import {ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { SolutionsComponent } from './solutions/solutions.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyserviceService } from './myservice.service';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy,LocationStrategy } from '@angular/common';
import {} from 'googlemaps'
import {MatIconModule} from '@angular/material/icon';
import { LoaderComponent } from './loader/loader.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { BidiModule } from '@angular/cdk/bidi';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    ContactComponent,
    HelpComponent,
    SolutionsComponent,
    LoaderComponent,
    FooterComponent,
    HeaderComponent,
    ChatbotComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbCarouselModule,
    NgbModule,
    FormsModule,
    MatIconModule,
    RecaptchaModule,
    BidiModule
  ],
  providers: [
    provideClientHydration(),
    MyserviceService,
    provideHttpClient(withFetch()),
    {provide:LocationStrategy,useClass:HashLocationStrategy},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
