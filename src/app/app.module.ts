import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { EmptyLogoComponent } from './empty-logo/empty-logo.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CartService, ProductService } from './services';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CartComponent,
        ProductComponent,
        AddToCartComponent,
        EmptyLogoComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatBadgeModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        FormsModule,
        MatTooltipModule,
    ],
    providers: [CartService, ProductService],
    bootstrap: [AppComponent],
    entryComponents: [AddToCartComponent],
})
export class AppModule {}
