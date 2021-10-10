import { Amount } from '../Amount';
import { Customer } from '../Customer';
import { Item } from '../../../model/wirecard/Item';

export class OrderRequest
{
    ownId: string;
    amount: Amount;
    items: Item[];
    customer: Customer;
    hash: string;
    expirationMonth: string;
    expirationYear: string;
    number: string;
    cvc: string;
    parcelas: string;
}
