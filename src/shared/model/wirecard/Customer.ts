import { Fundinginstrument } from './Fundinginstrument';
import { Phone } from './Phone';
import { TaxDocument } from './TaxDocument';
import { ShippingAddress } from './ShippingAddress';
import { _Links } from './_Links';
import { Address } from './Address';
import { Moipaccount } from './Moipaccount';
import { Billing_Info } from './Billing_Info';

export class Customer
{

    Id: string;

    OwnId: string;

    FullName: string;

    CreatedAt: Date | string;

    BirthDate: string;

    Email: string;

    FundingInstrument: Fundinginstrument;

    Phone: Phone;

    TaxDocument: TaxDocument;

    ShippingAddress: ShippingAddress;

    _Links: _Links;

    UpdatedAt: Date | string;

    MoipAccount: Moipaccount;

    Creation_time: string;

    Code: string;

    Address: Address;

    BirthDate_Year: number;

    Creation_Date: string;

    BirthDate_Month: string;

    Billing_Info: Billing_Info;

    Cpf: string;

    Phone_Number: string;

    BirthDate_Day: number;

    Phone_Area_Code: string;

    Enabled: boolean;
}
