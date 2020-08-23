import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { ProductViewModel } from 'src/models';
import * as testData from '../../data/products.json';
import { CartComponent } from './cart.component';

fdescribe('A Cart Component', () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CartComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [MatIconModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    xit('should correctly assign quantities to products', () => {});

    it('should calculate correct price for empty cart', () => {
        expect(component.totalPrice).toBe(0);
    });

    it('should calculate correct price for cart: A', () => {
        const a = testData.products.filter((p) => p.id === 'A')[0];
        component.items = [{ product: ProductViewModel.factory(a), quantity: 1 }];

        expect(component.totalPrice).toBe(50);
    });

    it('should calculate correct price for cart: A,B', () => {
        const a = testData.products.filter((p) => p.id === 'A')[0];
        const b = testData.products.filter((p) => p.id === 'B')[0];
        component.items = [
            { product: ProductViewModel.factory(a), quantity: 1 },
            { product: ProductViewModel.factory(b), quantity: 1 },
        ];

        expect(component.totalPrice).toBe(80);
    });

    it('should calculate correct price for cart: C,D,B,A', () => {
        const a = testData.products.filter((p) => p.id === 'A')[0];
        const b = testData.products.filter((p) => p.id === 'B')[0];
        const c = testData.products.filter((p) => p.id === 'C')[0];
        const d = testData.products.filter((p) => p.id === 'D')[0];
        component.items = [
            { product: ProductViewModel.factory(c), quantity: 1 },
            { product: ProductViewModel.factory(d), quantity: 1 },
            { product: ProductViewModel.factory(b), quantity: 1 },
            { product: ProductViewModel.factory(a), quantity: 1 },
        ];

        expect(component.totalPrice).toBe(115);
    });

    it('should calculate correct price for cart: A,A', () => {
        const a = testData.products.filter((p) => p.id === 'A')[0];
        component.items = [{ product: ProductViewModel.factory(a), quantity: 2 }];

        expect(component.totalPrice).toBe(50);
    });

    it('should calculate correct price for cart: A,A,A', () => {
        const a = testData.products.filter((p) => p.id === 'A')[0];
        component.items = [{ product: ProductViewModel.factory(a), quantity: 3 }];

        expect(component.totalPrice).toBe(130);
    });

    it('should calculate correct price for cart: A,A,A,A', () => {
        const a = testData.products.filter((p) => p.id === 'A')[0];
        component.items = [{ product: ProductViewModel.factory(a), quantity: 4 }];

        expect(component.totalPrice).toBe(180);
    });

    it('should calculate correct price for cart: A,A,A,A,A', () => {
        const a = testData.products.filter((p) => p.id === 'A')[0];
        component.items = [{ product: ProductViewModel.factory(a), quantity: 5 }];

        expect(component.totalPrice).toBe(220);
    });

    it('should calculate correct price for cart: A,A,A,A,A,A', () => {
        const a = testData.products.filter((p) => p.id === 'A')[0];
        component.items = [{ product: ProductViewModel.factory(a), quantity: 6 }];

        expect(component.totalPrice).toBe(260);
    });

    it('should calculate correct price for cart: A,A,A,B', () => {
        const a = testData.products.filter((p) => p.id === 'A')[0];
        const b = testData.products.filter((p) => p.id === 'B')[0];
        component.items = [
            { product: ProductViewModel.factory(a), quantity: 3 },
            { product: ProductViewModel.factory(b), quantity: 1 },
        ];

        expect(component.totalPrice).toBe(160);
    });

    it('should calculate correct price for cart: A,A,A,B,B', () => {
        const a = testData.products.filter((p) => p.id === 'A')[0];
        const b = testData.products.filter((p) => p.id === 'B')[0];
        component.items = [
            { product: ProductViewModel.factory(a), quantity: 3 },
            { product: ProductViewModel.factory(b), quantity: 2 },
        ];

        expect(component.totalPrice).toBe(175);
    });

    it('should calculate correct price for cart: A,A,A,B,B,D', () => {
        const a = testData.products.filter((p) => p.id === 'A')[0];
        const b = testData.products.filter((p) => p.id === 'B')[0];
        const d = testData.products.filter((p) => p.id === 'D')[0];
        component.items = [
            { product: ProductViewModel.factory(a), quantity: 3 },
            { product: ProductViewModel.factory(b), quantity: 2 },
            { product: ProductViewModel.factory(d), quantity: 1 },
        ];

        expect(component.totalPrice).toBe(190);
    });

    it('should calculate correct price for cart: D,A,B,A,B,A', () => {
        const a = testData.products.filter((p) => p.id === 'A')[0];
        const b = testData.products.filter((p) => p.id === 'B')[0];
        const d = testData.products.filter((p) => p.id === 'D')[0];
        component.items = [
            { product: ProductViewModel.factory(a), quantity: 3 },
            { product: ProductViewModel.factory(b), quantity: 2 },
            { product: ProductViewModel.factory(d), quantity: 1 },
        ];

        expect(component.totalPrice).toBe(190);
    });

    it('should calculate correct price for cart: F,F,F,F', () => {
        const f = testData.products.filter((p) => p.id === 'F')[0];
        component.items = [{ product: ProductViewModel.factory(f), quantity: 4 }];

        expect(component.totalPrice).toBe(30);
    });

    it('should calculate correct price for cart: F,F,F,F,F,F,F,F', () => {
        const f = testData.products.filter((p) => p.id === 'F')[0];
        component.items = [{ product: ProductViewModel.factory(f), quantity: 8 }];

        expect(component.totalPrice).toBe(50);
    });

    it('should calculate correct price for cart: F,F,F,F,F,F,F,F,F,F', () => {
        const f = testData.products.filter((p) => p.id === 'F')[0];
        component.items = [{ product: ProductViewModel.factory(f), quantity: 10 }];

        expect(component.totalPrice).toBe(60);
    });

    it('should calculate correct price for cart: F,F,F,F,F,D,F,F,F,F,F', () => {
        const d = testData.products.filter((p) => p.id === 'D')[0];
        const f = testData.products.filter((p) => p.id === 'F')[0];
        component.items = [
            { product: ProductViewModel.factory(d), quantity: 2 },
            { product: ProductViewModel.factory(f), quantity: 10 },
        ];

        expect(component.totalPrice).toBe(75);
    });

    it('should calculate correct price for cart: E,E,E,D,E', () => {
        const d = testData.products.filter((p) => p.id === 'D')[0];
        const e = testData.products.filter((p) => p.id === 'E')[0];
        component.items = [
            { product: ProductViewModel.factory(d), quantity: 1 },
            { product: ProductViewModel.factory(e), quantity: 4 },
        ];

        expect(component.totalPrice).toBe(45);
    });

    xit('should throw error on scan of unknown article', () => {
        // pricingRulesService.pricingRuleValueObjects = pricingRuleValueObjects;
        // expect((): void => service.scan('X')).toThrowError(Error);
    });

    xit('should throw error on unknown price for package size', () => {
        // pricingRulesService.pricingRuleValueObjects = pricingRuleValueObjects;
        // service.scan('E');
        // expect((): number => service.getTotalPrice()).toThrowError(Error);
    });

    xit('should throw error on call to getTotalPrice without pricing rules', () => {
        // expect((): number => service.getTotalPrice()).toThrowError(Error);
    });
});
