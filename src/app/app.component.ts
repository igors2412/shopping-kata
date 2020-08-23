import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICartItem } from 'src/models';
import { CartService } from './services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    private cartItems: ICartItem[] = [];

    private addSub: Subscription;
    private removeSub: Subscription;

    get itemCount(): number {
        return this.cartItems.length;
    }

    constructor(private readonly cartService: CartService) {}

    ngOnInit(): void {
        this.addSub = this.cartService.itemAdded.subscribe((item) => this.gotItem(item));
        this.removeSub = this.cartService.itemRemoved.subscribe((item) => this.itemRemoved(item));
    }
    ngOnDestroy(): void {
        this.addSub.unsubscribe();
        this.removeSub.unsubscribe();
    }

    private gotItem(item: ICartItem | undefined): void {
        if (!this.cartItems.some((ci) => ci.product.id === item.product.id)) {
            this.cartItems.push(item);
        }
    }

    private itemRemoved(item: ICartItem | undefined): void {
        const oldItem = this.cartItems.find((ci) => ci.product.id === item.product.id);
        if (oldItem === undefined) {
            return;
        }

        const index = this.cartItems.indexOf(oldItem);
        this.cartItems.splice(index, 1);
    }
}
