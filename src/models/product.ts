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

export class ProductViewModel implements IProduct {
    id: string;
    name: string;
    icon: string;

    cost: number | undefined;
    saleCost: number | undefined;
    saleQuantity: number | undefined;
    superSaleCost: number | undefined;
    superSaleQuantity: number | undefined;

    static factory(product: IProduct): ProductViewModel {
        const vm = new ProductViewModel();

        for (const key in product) {
            vm[key] = product[key];
        }

        return vm;
    }

    get isSaleOnly(): boolean {
        return this.cost === undefined;
    }

    get hasSale(): boolean {
        return this.saleCost !== undefined && this.saleQuantity !== undefined;
    }

    get hasSuperSale(): boolean {
        return this.superSaleCost !== undefined && this.superSaleQuantity !== undefined;
    }

    get minimumQuantity(): number {
        if (this.cost !== undefined) {
            return 1;
        }
        if (this.saleCost !== undefined) {
            return this.saleQuantity;
        }
        if (this.superSaleCost !== undefined) {
            return this.superSaleQuantity;
        }
    }

    calculatePriceByQuantity(quantity: number): number {
        if (quantity === 0) {
            return 0;
        }

        if (this.hasSuperSale && quantity >= this.superSaleQuantity) {
            return this.calculatePriceFragmentByQuantity(quantity, this.superSaleCost, this.superSaleQuantity);
        } else if (this.hasSale && quantity >= this.saleQuantity) {
            return this.calculatePriceFragmentByQuantity(quantity, this.saleCost, this.saleQuantity);
        } else if (!this.isSaleOnly) {
            return quantity * this.cost;
        } else {
            throw new Error(`Faulty data model for product with id: ${this.id}`);
        }
    }

    private calculatePriceFragmentByQuantity(quantity: number, saleCost: number, saleQuantity: number): number {
        const remainder = quantity % saleQuantity;

        if (remainder === 0) {
            return quantity * saleCost;
        } else {
            return this.calculatePriceByQuantity(remainder) + this.calculatePriceByQuantity(quantity - remainder);
        }
    }
}
