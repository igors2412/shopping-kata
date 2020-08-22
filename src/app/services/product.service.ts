import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import * as data from '../../data/products.json';
import { IProduct } from '../../models';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    getProducts(): Observable<IProduct[]> {
        const products = data.products as IProduct[];
        return of(products).pipe(delay(1500));
    }
}
