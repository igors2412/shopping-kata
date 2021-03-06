import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipDefaultOptions, MatTooltipModule, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
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

const toolTipOptions: Partial<MatTooltipDefaultOptions> = { touchGestures: 'on' };

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
        MatSelectModule,
    ],
    providers: [CartService, ProductService, { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: toolTipOptions }],
    bootstrap: [AppComponent],
    entryComponents: [AddToCartComponent],
})
export class AppModule {}
