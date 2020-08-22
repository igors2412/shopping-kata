import { Component, Input } from '@angular/core';
import { ProductViewModel } from 'src/models';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
    @Input() product: ProductViewModel;
}
