import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductViewModel } from 'src/models';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
    @Input() product: ProductViewModel;

    constructor(private readonly dialog: MatDialog) {}

    addToCart(): void {
        this.dialog.open(AddToCartComponent, { data: this.product });
    }
}
