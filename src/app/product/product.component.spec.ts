import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { ProductViewModel } from 'src/models';
import * as testData from '../../data/products.json';
import { ProductComponent } from './product.component';

describe('a product component', () => {
    let component: ProductComponent;
    let fixture: ComponentFixture<ProductComponent>;
    const testProducts = testData.products;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductComponent],
            imports: [MatDialogModule, MatIconModule],
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
});
