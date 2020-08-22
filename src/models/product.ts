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
}
