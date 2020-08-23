import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ICartItem } from 'src/models';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private _itemAdded = new ReplaySubject<ICartItem>();
    readonly itemAdded = this._itemAdded.asObservable();

    private _itemRemoved = new ReplaySubject<ICartItem>();
    readonly itemRemoved = this._itemRemoved.asObservable();

    addItem(item: ICartItem): void {
        this._itemAdded.next(item);
    }

    removeItem(item: ICartItem): void {
        this._itemRemoved.next(item);
    }
}
