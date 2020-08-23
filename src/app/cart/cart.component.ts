import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICartItem } from 'src/models';
import { CartService } from '../services';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
    items: ICartItem[] = [];

    private addSub: Subscription;

    get isEmpty(): boolean {
        return this.items.length === 0;
    }

    get totalPrice(): number {
        const price = this.items.reduce((a, b) => a + b.product.calculatePriceByQuantity(b.quantity), 0);
        return Math.round(price);
    }

    constructor(private readonly cartService: CartService) {}

    ngOnInit(): void {
        this.addSub = this.cartService.itemAdded.subscribe((item) => this.gotItem(item));
    }

    ngOnDestroy(): void {
        this.addSub.unsubscribe();
    }

    private gotItem(item: ICartItem): void {
        const existingItem = this.items.filter((i) => i.product.id === item.product.id)[0];
        if (existingItem === undefined) {
            this.items.push(item);
        } else {
            existingItem.quantity += item.quantity;
        }
    }

    clearCart(): void {
        this.items = [];
    }
}
