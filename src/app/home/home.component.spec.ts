import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of } from 'rxjs';
import * as testData from '../../data/test-products.json';
import { ProductService } from '../services';
import { HomeComponent } from './home.component';

describe('a home component', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    const testProducts = testData.products;

    const fakeProductService = jasmine.createSpyObj('ProductService', ['getProducts']);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [MatProgressSpinnerModule],
            providers: [{ provide: ProductService, useValue: fakeProductService }],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fakeProductService.getProducts.and.returnValue(of(testProducts));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch a list of products when loading', () => {
        component.ngOnInit();
        expect(component.products.length).toBe(testProducts.length);

        const hasViewModel = component.products.every((p) => p !== undefined);
        expect(hasViewModel).toBeTruthy();
    });
});
