import { Creation_Date } from './Creation_Date';
import { Plan } from './Plan';
import { Customer } from './Customer';
import { Status } from './Status';
import { Invoicestatus } from './Invoicestatus';

export class Invoice
    {

        Amount: number;

        Id: number;

        Status: Status;

        Subscription_Code: string;

        Creation_Date: Creation_Date;

        Occurrence: number;

        Plan: Plan;

        Customer: Customer;

        InvoiceStatus: Invoicestatus;
    }
