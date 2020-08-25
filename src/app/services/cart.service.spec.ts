import { ICartItem, ProductViewModel } from 'src/models';
import * as testData from '../../data/products.json';
import { CartService, IStorableCart } from './cart.service';

const STORAGE_ID = 'bvv-shopping-kata';

function getStoredCart(): IStorableCart {
    return JSON.parse(localStorage.getItem(STORAGE_ID));
}

describe('a shopping cart service', () => {
    let service: CartService;
    const testProducts = testData.products;

    beforeEach(() => {
        localStorage.clear();
        service = new CartService();
    });

    it('should have 0 items on first init', () => {
        expect(service.cartItems).toEqual([]);
    });

    it('should load items on init from local storage', () => {
        const cart: IStorableCart = {
            items: [{ quantity: 1, product: testProducts[0] }],
        };

        localStorage.setItem(STORAGE_ID, JSON.stringify(cart));
        service = new CartService();
        expect(service.getCartItemById('A')).toBeDefined();
    });

    it('should add an item to local storage', () => {
        service.addItem({
            product: new ProductViewModel(testProducts[0]),
            quantity: 1,
        });

        const stored = getStoredCart();
        expect(stored.items[0].product).toEqual(testProducts[0]);
    });

    it('should remove an item from local storage', () => {
        const item: ICartItem = {
            product: new ProductViewModel(testProducts[0]),
            quantity: 1,
        };

        service.addItem(item);
        service.removeItem(item);

        const stored = getStoredCart();
        expect(stored.items).toEqual([]);
    });

    it('should clear the local storage', () => {
        const i1: ICartItem = {
            product: new ProductViewModel(testProducts[0]),
            quantity: 1,
        };
        const i2: ICartItem = {
            product: new ProductViewModel(testProducts[1]),
            quantity: 1,
        };

        service.addItem(i1);
        service.addItem(i2);
        service.clearCartStorage();

        const stored = getStoredCart();
        expect(stored.items).toEqual([]);
    });

    it('should load an item by ID', () => {
        const i1: ICartItem = {
            product: new ProductViewModel(testProducts[0]),
            quantity: 1,
        };
        service.addItem(i1);

        expect(service.getCartItemById('A')).toBeDefined();
        expect(service.getCartItemById('B')).not.toBeDefined();
    });

    it('should throw an error upon removing a non existing item', () => {
        const i1: ICartItem = {
            product: new ProductViewModel(testProducts[0]),
            quantity: 1,
        };
        const i2: ICartItem = {
            product: new ProductViewModel(testProducts[1]),
            quantity: 1,
        };
        service.addItem(i1);

        expect(() => service.removeItem(i2)).toThrow();
    });

    it('should only update the quantity when adding the same item again', () => {
        const i1: ICartItem = {
            product: new ProductViewModel(testProducts[0]),
            quantity: 1,
        };
        service.addItem(i1);

        const i11 = { ...i1 };
        i11.quantity = 5;
        service.addItem(i11);

        expect(service.cartItems[0].quantity).toBe(6);
    });
});
