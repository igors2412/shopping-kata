import { ProductViewModel } from './product';

export interface ICartItem {
    product: ProductViewModel;
    quantity: number;
}
