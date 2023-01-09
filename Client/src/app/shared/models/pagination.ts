import { Product } from "./product";

export interface IPagination {
    body: unknown;
    pageIndex: number;
    pageSize: number;
    count: number;
    data: Product[];
}