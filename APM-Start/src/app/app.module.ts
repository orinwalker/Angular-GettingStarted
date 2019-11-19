import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { FormsModule } from '@angular/forms';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { StarComponent } from './shared/star.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailComponent } from './products/product-detail.component';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { ProductDetailGuard } from './products/product-detail.guard';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    StarComponent,
    ConvertToSpacesPipe,
    ProductDetailComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'products', component: ProductListComponent},
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent
      },
      // { path: 'products/:id', component: ProductDetailComponent},
      { path: 'welcome', component: WelcomeComponent},
      { path: '', redirectTo: 'welcome', pathMatch: 'full'},
      { path: '**', redirectTo: 'welcome', pathMatch: 'full'},
    ]),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
