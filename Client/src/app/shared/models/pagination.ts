import { Product } from "./product";

export interface Pagination<T> {
    body: unknown;
    pageIndex: number;
    pageSize: number;
    count: number;
    data: T;
}