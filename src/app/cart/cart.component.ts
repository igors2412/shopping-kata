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

    private cartSub: Subscription;

    get isEmpty(): boolean {
        return this.items.length === 0;
    }

    get totalPrice(): number {
        return this.items.reduce((a, b) => a + b.product.calculatePriceByQuantity(b.quantity), 0);
    }

    constructor(private readonly cartService: CartService) {}

    ngOnInit(): void {
        this.items = this.cartService.cartItems;
        this.cartSub = this.cartService.cartChanged.subscribe((items) => this.gotItems(items));
    }

    ngOnDestroy(): void {
        this.cartSub.unsubscribe();
    }

    private gotItems(items: ICartItem[]): void {
        this.items = items;
    }

    removeItem(item: ICartItem): void {
        this.cartService.removeItem(item);
    }

    updateItemWithQuantity(quantity: number, item: ICartItem): void {
        item.quantity = quantity;
        this.cartService.updateItemQuantity(item);
    }
}
