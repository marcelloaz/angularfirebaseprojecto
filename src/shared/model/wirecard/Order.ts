import { Amount } from './Amount';
import { Customer } from './Customer';
import { Item } from './Item';
import { _Links } from './_Links';
import { Payment } from './Payment';
import { Receiver } from './Receiver';
import { Address } from './Address';

export class Order
{
    Id: string;
    OwnId: string;
    Status: string;
    Blocked: boolean;
    Amount: Amount;
    Receivers: Receiver[];
    Customer: Customer;
    Items: Item[];
    Payments: Payment[];
    Events: Event[];
    _Links: _Links;
    CreatedAt: Date | string;
    UpdatedAt: Date | string;
    Href: string;
    Title: string;
    Addresses: Address[];
    Entries: any[];
    Escrows: any[];
    Platform: string;
    Refunds: any[];
}
