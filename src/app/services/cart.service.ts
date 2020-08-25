import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICartItem, IProduct, ProductViewModel } from 'src/models';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private _cartChanged = new Subject<ICartItem[]>();
    readonly cartChanged = this._cartChanged.asObservable();

    private _cartItems: ICartItem[];
    private readonly storageKey = 'bvv-shopping-kata';

    get itemCount(): number {
        return this._cartItems.length;
    }

    get cartItems(): ICartItem[] {
        return this._cartItems;
    }

    constructor() {
        const storeValue = localStorage.getItem(this.storageKey);

        if (storeValue !== null) {
            const storedCart: IStorableCart = JSON.parse(storeValue);
            this._cartItems = storedCart.items.map((si) => {
                const res: ICartItem = {
                    quantity: si.quantity,
                    product: new ProductViewModel(si.product),
                };
                return res;
            });
        } else {
            this._cartItems = [];
        }
    }

    addItem(item: ICartItem): void {
        this.addOrUpdateItem(item, false);
    }

    updateItemQuantity(item: ICartItem): void {
        this.addOrUpdateItem(item, true);
    }

    removeItem(item: ICartItem): void {
        const existingItem = this.getCartItemById(item.product.data.id);

        if (existingItem === undefined) {
            throw new Error('Cart Service - cannot delete a product that does not exist');
        } else {
            const index = this._cartItems.indexOf(existingItem);
            this._cartItems.splice(index, 1);
            this.updateStorage();
        }
    }

    clearCartStorage(): void {
        this._cartItems = [];
        this.updateStorage();
    }

    getCartItemById(id: string): ICartItem | undefined {
        return this._cartItems.filter((ci) => ci.product.data.id === id)[0];
    }

    private addOrUpdateItem(item: ICartItem, hasNewQuantity: boolean): void {
        const existingItem = this.getCartItemById(item.product.data.id);

        if (existingItem === undefined) {
            this._cartItems.push(item);
        } else {
            const quantity = hasNewQuantity ? item.quantity : existingItem.quantity + item.quantity;
            existingItem.quantity = quantity;
        }

        this.updateStorage();
    }

    private toStorabeCartItem(item: ICartItem): IStorableCartItem {
        return {
            product: item.product.data,
            quantity: item.quantity,
        };
    }

    private updateStorage(): void {
        const storableCart: IStorableCart = {
            items: this._cartItems.map((i) => this.toStorabeCartItem(i)),
        };

        localStorage.setItem(this.storageKey, JSON.stringify(storableCart));
        this._cartChanged.next(this._cartItems);
    }
}

export interface IStorableCart {
    items: IStorableCartItem[];
}

export interface IStorableCartItem {
    product: IProduct;
    quantity: number;
}
