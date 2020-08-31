import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { ProductViewModel } from 'src/models';
import * as testData from '../../data/products.json';
import { ProductComponent } from './product.component';

describe('a product component', () => {
    let component: ProductComponent;
    let fixture: ComponentFixture<ProductComponent>;
    const testProducts = testData.products;

    const fakeDialog = jasmine.createSpyObj('MatDialog', ['open']);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductComponent],
            imports: [MatDialogModule, MatIconModule],
            providers: [{ provide: MatDialog, useValue: fakeDialog }],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductComponent);
        component = fixture.componentInstance;
        component.product = new ProductViewModel(testProducts[0]);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show an icon if a sale exists', () => {
        const productA = testProducts[0];
        const aCopy = { ...productA };
        delete aCopy.superSaleCost;
        delete aCopy.superSaleQuantity;

        component.product = new ProductViewModel(aCopy);
        fixture.detectChanges();

        const result = fixture.debugElement.query(By.css('.sale'));
        expect(result).not.toBeNull();
    });

    it('should show an icon if a super sale exists', () => {
        const productA = testProducts[0];
        const aCopy = { ...productA };
        delete aCopy.saleCost;
        delete aCopy.saleQuantity;

        component.product = new ProductViewModel(aCopy);
        fixture.detectChanges();

        const result = fixture.debugElement.query(By.css('.sale'));
        expect(result).not.toBeNull();
    });

    it('should hide the sale icon if there is no sale offer', () => {
        const productA = testProducts[0];
        const aCopy = { ...productA };
        delete aCopy.saleCost;
        delete aCopy.saleQuantity;
        delete aCopy.superSaleCost;
        delete aCopy.superSaleQuantity;

        component.product = new ProductViewModel(aCopy);
        fixture.detectChanges();

        const result = fixture.debugElement.query(By.css('.sale'));
        expect(result).toBeNull();
    });

    it('should show the "add to cart" dialog when selected', () => {
        component.addToCart();
        expect(fakeDialog.open).toHaveBeenCalled();
    });
});
