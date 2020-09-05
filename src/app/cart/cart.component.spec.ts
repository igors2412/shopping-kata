import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { ICartItem, ProductViewModel } from 'src/models';
import * as testData from '../../data/test-products.json';
import { EmptyLogoComponent } from '../empty-logo/empty-logo.component';
import { CartService } from '../services';
import { CartComponent } from './cart.component';

describe('a cart component', () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CartComponent, EmptyLogoComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [MatIconModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        localStorage.clear();
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should calculate correct price for empty cart', () => {
        expect(component.totalPrice).toBe(0);
    });

    it('should correctly calculate 0 quantity', () => {
        const a = testData.products.find((p) => p.id === 'A');
        component.items = [{ product: new ProductViewModel(a), quantity: 0 }];

        expect(component.totalPrice).toBe(0);
    });

    it('should calculate correct price for cart: A', () => {
        const a = testData.products.find((p) => p.id === 'A');
        component.items = [{ product: new ProductViewModel(a), quantity: 1 }];

        expect(component.totalPrice).toBe(50);
    });

    it('should calculate correct price for cart: A,B', () => {
        const a = testData.products.find((p) => p.id === 'A');
        const b = testData.products.find((p) => p.id === 'B');
        component.items = [
            { product: new ProductViewModel(a), quantity: 1 },
            { product: new ProductViewModel(b), quantity: 1 },
        ];

        expect(component.totalPrice).toBe(80);
    });

    it('should calculate correct price for cart: C,D,B,A', () => {
        const a = testData.products.find((p) => p.id === 'A');
        const b = testData.products.find((p) => p.id === 'B');
        const c = testData.products.find((p) => p.id === 'C');
        const d = testData.products.find((p) => p.id === 'D');
        component.items = [
            { product: new ProductViewModel(c), quantity: 1 },
            { product: new ProductViewModel(d), quantity: 1 },
            { product: new ProductViewModel(b), quantity: 1 },
            { product: new ProductViewModel(a), quantity: 1 },
        ];

        expect(component.totalPrice).toBe(115);
    });

    it('should calculate correct price for cart: A,A', () => {
        const a = testData.products.find((p) => p.id === 'A');
        component.items = [{ product: new ProductViewModel(a), quantity: 2 }];

        expect(component.totalPrice).toBe(90);
    });

    it('should calculate correct price for cart: A,A,A', () => {
        const a = testData.products.find((p) => p.id === 'A');
        component.items = [{ product: new ProductViewModel(a), quantity: 3 }];

        expect(component.totalPrice).toBe(130);
    });

    it('should calculate correct price for cart: A,A,A,A', () => {
        const a = testData.products.find((p) => p.id === 'A');
        component.items = [{ product: new ProductViewModel(a), quantity: 4 }];

        expect(component.totalPrice).toBe(180);
    });

    it('should calculate correct price for cart: A,A,A,A,A', () => {
        const a = testData.products.find((p) => p.id === 'A');
        component.items = [{ product: new ProductViewModel(a), quantity: 5 }];

        expect(component.totalPrice).toBe(220);
    });

    it('should calculate correct price for cart: A,A,A,A,A,A', () => {
        const a = testData.products.find((p) => p.id === 'A');
        component.items = [{ product: new ProductViewModel(a), quantity: 6 }];

        expect(component.totalPrice).toBe(260);
    });

    it('should calculate correct price for cart: A,A,A,B', () => {
        const a = testData.products.find((p) => p.id === 'A');
        const b = testData.products.find((p) => p.id === 'B');
        component.items = [
            { product: new ProductViewModel(a), quantity: 3 },
            { product: new ProductViewModel(b), quantity: 1 },
        ];

        expect(component.totalPrice).toBe(160);
    });

    it('should calculate correct price for cart: A,A,A,B,B', () => {
        const a = testData.products.find((p) => p.id === 'A');
        const b = testData.products.find((p) => p.id === 'B');
        component.items = [
            { product: new ProductViewModel(a), quantity: 3 },
            { product: new ProductViewModel(b), quantity: 2 },
        ];

        expect(component.totalPrice).toBe(175);
    });

    it('should calculate correct price for cart: A,A,A,B,B,D', () => {
        const a = testData.products.find((p) => p.id === 'A');
        const b = testData.products.find((p) => p.id === 'B');
        const d = testData.products.find((p) => p.id === 'D');
        component.items = [
            { product: new ProductViewModel(a), quantity: 3 },
            { product: new ProductViewModel(b), quantity: 2 },
            { product: new ProductViewModel(d), quantity: 1 },
        ];

        expect(component.totalPrice).toBe(190);
    });

    it('should calculate correct price for cart: D,A,B,A,B,A', () => {
        const a = testData.products.find((p) => p.id === 'A');
        const b = testData.products.find((p) => p.id === 'B');
        const d = testData.products.find((p) => p.id === 'D');
        component.items = [
            { product: new ProductViewModel(a), quantity: 3 },
            { product: new ProductViewModel(b), quantity: 2 },
            { product: new ProductViewModel(d), quantity: 1 },
        ];

        expect(component.totalPrice).toBe(190);
    });

    it('should calculate correct price for cart: F,F,F,F', () => {
        const f = testData.products.find((p) => p.id === 'F');
        component.items = [{ product: new ProductViewModel(f), quantity: 4 }];

        expect(component.totalPrice).toBe(40);
    });

    it('should calculate correct price for cart: F,F,F,F,F,F,F,F', () => {
        const f = testData.products.find((p) => p.id === 'F');
        component.items = [{ product: new ProductViewModel(f), quantity: 8 }];

        expect(component.totalPrice).toBe(50);
    });

    it('should calculate correct price for cart: F,F,F,F,F,F,F,F,F,F', () => {
        const f = testData.products.find((p) => p.id === 'F');
        component.items = [{ product: new ProductViewModel(f), quantity: 10 }];

        expect(component.totalPrice).toBe(70);
    });

    it('should calculate correct price for cart: F,F,F,F,F,D,F,F,F,F,F', () => {
        const d = testData.products.find((p) => p.id === 'D');
        const f = testData.products.find((p) => p.id === 'F');
        component.items = [
            { product: new ProductViewModel(d), quantity: 1 },
            { product: new ProductViewModel(f), quantity: 10 },
        ];

        expect(component.totalPrice).toBe(85);
    });

    it('should calculate correct price for cart: E,E,E,D,E', () => {
        const d = testData.products.find((p) => p.id === 'D');
        const e = testData.products.find((p) => p.id === 'E');
        component.items = [
            { product: new ProductViewModel(d), quantity: 1 },
            { product: new ProductViewModel(e), quantity: 4 },
        ];

        expect(component.totalPrice).toBe(45);
    });

    it('should calculate correct price for cart: 19x G', () => {
        const g = testData.products.find((p) => p.id === 'G');
        component.items = [{ product: new ProductViewModel(g), quantity: 19 }];
        expect(component.totalPrice).toBe(1270);
    });

    it('should throw error when calculating the price without pricing rules', () => {
        const d = testData.products.find((p) => p.id === 'D');
        const dCopy = { ...d };
        delete dCopy.cost;
        component.items = [{ product: new ProductViewModel(dCopy), quantity: 1 }];

        expect(() => component.totalPrice).toThrow();
    });

    it('should show a message when the cart is empty', () => {
        expect(component.isEmpty).toBeTrue();
        const emptyComp = fixture.debugElement.query(By.css('app-empty-logo'));
        expect(emptyComp).not.toBeNull();
    });

    it('should generate a selection of 20 possible product quantities', () => {
        component.items = [{ quantity: 1, product: new ProductViewModel(testData.products[0]) }];
        fixture.detectChanges();
        const inputElem = fixture.debugElement.queryAll(By.css('mat-option'));
        expect(inputElem.length).toBe(20);
    });

    it('should update the cart items via subscription', () => {
        const cartService = TestBed.inject(CartService);
        component.ngOnInit();
        expect(component.items).toEqual([]);

        const item: ICartItem = {
            product: new ProductViewModel(testData.products[0]),
            quantity: 1,
        };
        cartService.addItem(item);

        expect(component.items).toEqual([item]);
    });

    it('should notify other subscribers when a cart item is removed', () => {
        const cartService = TestBed.inject(CartService);
        component.ngOnInit();
        expect(component.items).toEqual([]);

        const item: ICartItem = {
            product: new ProductViewModel(testData.products[0]),
            quantity: 1,
        };
        cartService.addItem(item);

        spyOn(cartService, 'removeItem');
        component.removeItem(item);

        expect(cartService.removeItem).toHaveBeenCalledWith(item);
    });

    it('should notify other subscribers when the quantity of a product was updated', () => {
        const cartService = TestBed.inject(CartService);
        component.ngOnInit();
        expect(component.items).toEqual([]);

        const item: ICartItem = {
            product: new ProductViewModel(testData.products[0]),
            quantity: 1,
        };
        cartService.addItem(item);

        spyOn(cartService, 'updateItemQuantity');
        component.updateItemWithQuantity(5, item);

        expect(item.quantity).toBe(5);
        expect(cartService.updateItemQuantity).toHaveBeenCalledWith(item);
    });
});
