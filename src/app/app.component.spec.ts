import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBadgeModule } from '@angular/material/badge';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ICartItem, ProductViewModel } from 'src/models';
import { AppComponent } from './app.component';
import { CartService } from './services';

describe('an app component', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, MatBadgeModule],
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [AppComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it('should show a badge if there are products in the cart', () => {
        const cartService = TestBed.inject(CartService);
        const item: ICartItem = {
            quantity: 1,
            product: new ProductViewModel({
                id: 'A',
                cost: 10,
                icon: '',
                name: 'Ein Produkt',
            }),
        };
        cartService.addItem(item);
        fixture.detectChanges();

        const badge = fixture.debugElement.query(By.css('.mat-badge-content'));
        const badgeElem = badge.nativeElement as HTMLElement;
        expect(badgeElem.innerHTML).toBe('1');
    });

    it('should hide the badge if there are no products in the cart', () => {
        const cartService = TestBed.inject(CartService);
        cartService.clearCartStorage();
        fixture.detectChanges();
        const badge = fixture.debugElement.query(By.css('.mat-badge-hidden'));
        expect(badge).not.toBeNull();
    });
});
