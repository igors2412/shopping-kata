import { Component, OnInit } from '@angular/core';
import { IProduct, ProductViewModel } from 'src/models';
import { ProductService } from '../services';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    products: ProductViewModel[] = [];
    isLoading: boolean = false;

    constructor(private readonly productService: ProductService) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.productService.getProducts().subscribe((p) => this.gotData(p));
    }

    private gotData(products: IProduct[]): void {
        this.isLoading = false;
        this.products = products.map((p) => new ProductViewModel(p));
    }
}
