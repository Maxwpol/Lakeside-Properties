import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Layouts/home/home.component';
import { NavigationComponent } from './Layouts/navigation/navigation.component';
import { FooterComponent } from './Layouts/footer/footer.component';
import { SharedService } from './Services/shared.service';
import { PropertyComponent } from './Layouts/property/property.component';
import { TestComponent } from './Layouts/test/test.component';
import { AddPropertyComponent } from './Layouts/add-property/add-property.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    FooterComponent,
    PropertyComponent,
    TestComponent,
    AddPropertyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
