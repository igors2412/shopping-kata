import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICartItem, IProductSaleOption, ProductViewModel } from 'src/models';
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

    addToCart(): void {
        const item: ICartItem = {
            product: this.product,
            quantity: this.quantityForm.value,
        };

        this.cartService.addItem(item);
        this.dialogRef.close();
    }

    getSalePrice(option: IProductSaleOption): number {
        return Math.round(option.cost * option.quantity);
    }
}
