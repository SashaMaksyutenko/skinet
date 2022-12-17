import { IProduct } from "./product";

export interface IPagination {
    body: unknown;
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IProduct[];
}