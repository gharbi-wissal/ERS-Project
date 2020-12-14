import { Product } from '../product/product';

export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    products:Product[];

}
