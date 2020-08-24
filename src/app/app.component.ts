import { Component } from '@angular/core';
import { CartService } from './services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    get itemCount(): number {
        return this.cartService.itemCount;
    }

    constructor(private readonly cartService: CartService) {}
}
