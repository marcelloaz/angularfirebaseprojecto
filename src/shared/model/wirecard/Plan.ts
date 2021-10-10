import { Creation_Date } from './Creation_Date';
import { Trial } from './Trial';
import { Interval } from './Interval';

export class Plan
{

    Setup_Fee: number;

    Amount: number;

    Code: string;

    Description: string;

    Creation_Date: Creation_Date;

    Max_Qty: number;

    Trial: Trial;

    Name: string;

    Billing_Cycles: number;

    Interval: Interval;

    Id: string;

    Payment_Method: string;

    Status: string;
}
