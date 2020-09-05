export interface IProduct {
    id: string;
    name: string;

    // für die UI, um Produkte besser darzustellen
    // https://material.io/resources/icons/?style=baseline
    icon: string;

    cost: number;
    saleOptions?: IProductSaleOption[];
}

export interface IProductSaleOption {
    quantity: number;
    cost: number;
}

export class ProductViewModel {
    readonly prioritizedSaleOptions: IProductSaleOption[] | undefined;
    readonly quantitiySelection = Array.from(Array(20), (_, i) => i + 1);

    constructor(public readonly data: IProduct) {
        if (!this.hasSale) {
            return;
        }

        const comparer = (a: IProductSaleOption, b: IProductSaleOption) =>
            a.quantity === b.quantity ? 0 : a.quantity > b.quantity ? -1 : 1;
        this.prioritizedSaleOptions = this.data.saleOptions.sort(comparer);
    }

    get hasSale(): boolean {
        return this.data.saleOptions !== undefined;
    }

    calculatePriceByQuantity(quantity: number): number {
        if (this.data.cost === undefined) {
            throw new Error(`Data model error. Cannot calculate price without cost.`);
        }

        if (quantity === 0) {
            return 0;
        }

        if (!this.hasSale) {
            return Math.round(quantity * this.data.cost);
        }

        const highestSaleQuantityOption = this.prioritizedSaleOptions.find((o) => o.quantity <= quantity);
        const sale: IProductSaleOption = {
            cost: highestSaleQuantityOption ? highestSaleQuantityOption.cost : this.data.cost,
            quantity: highestSaleQuantityOption ? highestSaleQuantityOption.quantity : 1,
        };

        return this.calculatePriceFragmentByQuantity(quantity, sale.cost, sale.quantity);
    }

    private calculatePriceFragmentByQuantity(quantity: number, saleCost: number, saleQuantity: number): number {
        const remainder = quantity % saleQuantity;
        const result =
            remainder === 0
                ? quantity * saleCost
                : this.calculatePriceByQuantity(remainder) + this.calculatePriceByQuantity(quantity - remainder);
        return Math.round(result);
    }
}
