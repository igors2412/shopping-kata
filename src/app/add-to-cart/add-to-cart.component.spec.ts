import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { IProduct, ProductViewModel } from 'src/models';
import * as testData from '../../data/test-products.json';
import { CartService } from '../services';
import { AddToCartComponent } from './add-to-cart.component';

describe('an add to cart component', () => {
    let component: AddToCartComponent;
    let fixture: ComponentFixture<AddToCartComponent>;

    const products = testData.products as IProduct[];
    const testProduct = new ProductViewModel(products[0]);

    const fakeCartService = jasmine.createSpyObj('CartService', ['addItem']);
    const fakeDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddToCartComponent],
            imports: [MatDialogModule],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: CartService, useValue: fakeCartService },
                { provide: MatDialogRef, useValue: fakeDialogRef },
                { provide: MAT_DIALOG_DATA, useValue: testProduct },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddToCartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update the cart when adding a product', () => {
        component.addToCart();
        expect(fakeCartService.addItem).toHaveBeenCalled();
    });

    it('should generate a selection of 20 possible product quantities', () => {
        const inputElem = fixture.debugElement.queryAll(By.css('mat-option'));
        expect(inputElem.length).toBe(20);
    });

    it('should display the sale offer', () => {
        component.product = testProduct;
        fixture.detectChanges();

        const tag = fixture.debugElement.query(By.css('.small.sale'));
        expect(tag).not.toBeNull();

        const elem = tag.nativeElement as HTMLElement;
        expect(elem.innerHTML.includes('2 für 90 €.')).toBeTrue();
    });

    it('should display the super sale offer', () => {
        component.product = testProduct;
        fixture.detectChanges();

        const tag = fixture.debugElement.query(By.css('.small.supersale'));
        expect(tag).not.toBeNull();

        const elem = tag.nativeElement as HTMLElement;
        expect(elem.innerHTML.includes('3 für 130 €.')).toBeTrue();
    });
});
