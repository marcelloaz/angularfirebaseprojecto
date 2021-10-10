import { Fundinginstrument } from "./Fundinginstrument";
import { Amount } from './Amount';
import { Acquirerdetails } from './Acquirerdetails';
import { _Links } from './_Links';
import { Fee } from './Fee';
import { Payment_Method } from './Payment_Method';
import { Creation_Date } from './Creation_Date';
import { Cancellationdetails } from './Cancellationdetails';
import { Invoice } from './Invoice';

export class Payment
{

    Id: string;

    AcquirerDetails: Acquirerdetails;

    InstallmentCount: number;

    FundingInstrument: Fundinginstrument;

    Status: string;

    Amount: Amount;

    Fees: Fee[];

    Events: Event[];

    _Links: _Links;

    UpdatedAt: Date | string;

    CreatedAt: Date | string;

    Payments: Payment[];

    DelayCapture: boolean;

    StatementDescriptor: string;

    Moip_Id: number;

// tslint:disable-next-line: variable-name
    Payment_Method: Payment_Method;

// tslint:disable-next-line: variable-name
    Creation_Date: Creation_Date;

    CancellationDetails: Cancellationdetails;

    Subscription_Code: string;

    Invoice: Invoice;

    Customer_Code: string;
}
