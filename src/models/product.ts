export interface IProduct {
    id: string;
    name: string;

    // für die UI, um Produkte besser darzustellen
    // https://material.io/resources/icons/?style=baseline
    icon: string;

    cost?: number;

    saleCost?: number;
    saleQuantity?: number;

    superSaleCost?: number;
    superSaleQuantity?: number;
}

export class ProductViewModel {
    constructor(public readonly data: IProduct) {}

    get isSaleOnly(): boolean {
        return this.data.cost === undefined;
    }

    get hasSale(): boolean {
        return this.data.saleCost !== undefined && this.data.saleQuantity !== undefined;
    }

    get hasSuperSale(): boolean {
        return this.data.superSaleCost !== undefined && this.data.superSaleQuantity !== undefined;
    }

    get minimumQuantity(): number {
        if (this.data.cost !== undefined) {
            return 1;
        }
        if (this.data.saleCost !== undefined) {
            return this.data.saleQuantity;
        }
        if (this.data.superSaleCost !== undefined) {
            return this.data.superSaleQuantity;
        }
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
        } else if (!this.isSaleOnly) {
            return quantity * this.data.cost;
        } else {
            throw new Error(`Faulty data model for product with id: ${this.data.id}`);
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
