import { Brand } from "./brand.model";
import { SaxType } from "./saxType.model";

export interface Owner {
    ownerId: string;
    startOwnership: Date;
    endOwnership: Date;
}

export interface Saxophone {
    brand: Brand;
    saxType: SaxType;
    serialNumber: string;
}

export interface SaxophoneSearchCriterea {
    brand: Brand;
    saxType: SaxType;
    serialNumber: string;
}
