import { Category } from '../category/category';

export interface Product {
    id: number;
    productName: string;
    price: number;
    category:Category;
}
