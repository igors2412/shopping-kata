import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICartItem, ProductViewModel } from 'src/models';
import { CartService } from '../services';

@Component({
    selector: 'app-add-to-cart',
    templateUrl: './add-to-cart.component.html',
    styleUrls: ['./add-to-cart.component.scss'],
})
export class AddToCartComponent implements OnInit {
    quantityForm: FormControl;

    constructor(
        private readonly cartService: CartService,
        public dialogRef: MatDialogRef<AddToCartComponent>,
        @Inject(MAT_DIALOG_DATA) public product: ProductViewModel
    ) {}

    ngOnInit(): void {
        this.quantityForm = new FormControl(1);
    }

    get title(): string {
        return `${this.product.data.name} zum Warenkorb hinzufügen?`;
    }

    get salePrice(): number {
        return Math.round(this.product.data.saleCost * this.product.data.saleQuantity);
    }

    get superSalePrice(): number {
        return Math.round(this.product.data.superSaleCost * this.product.data.superSaleQuantity);
    }

    addToCart(): void {
        const item: ICartItem = {
            product: this.product,
            quantity: this.quantityForm.value,
        };

        this.cartService.addItem(item);
        this.dialogRef.close();
    }
}
