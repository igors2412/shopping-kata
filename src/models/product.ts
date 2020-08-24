export interface IProduct {
    id: string;
    name: string;

    // für die UI, um Produkte besser darzustellen
    // https://material.io/resources/icons/?style=baseline
    icon: string;

    cost: number;

    saleCost?: number;
    saleQuantity?: number;

    superSaleCost?: number;
    superSaleQuantity?: number;
}

export class ProductViewModel {
    constructor(public readonly data: IProduct) {}

    get hasSale(): boolean {
        return this.data.saleCost !== undefined && this.data.saleQuantity !== undefined;
    }

    get hasSuperSale(): boolean {
        return this.data.superSaleCost !== undefined && this.data.superSaleQuantity !== undefined;
    }

    get minimumQuantity(): number {
        if (this.data.saleCost !== undefined) {
            return this.data.saleQuantity;
        }
        if (this.data.superSaleCost !== undefined) {
            return this.data.superSaleQuantity;
        }

        return 1;
    }

    calculatePriceByQuantity(quantity: number): number {
        if (quantity === 0) {
            return 0;
        }

        if (this.hasSuperSale && quantity >= this.data.superSaleQuantity) {
            return this.calculatePriceFragmentByQuantity(
                quantity,
                this.data.superSaleCost,
                this.data.superSaleQuantity
            );
        } else if (this.hasSale && quantity >= this.data.saleQuantity) {
            return this.calculatePriceFragmentByQuantity(quantity, this.data.saleCost, this.data.saleQuantity);
        } else {
            return quantity * this.data.cost;
        }
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
