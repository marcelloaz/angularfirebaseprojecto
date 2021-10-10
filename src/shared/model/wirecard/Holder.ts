import { TaxDocument } from './TaxDocument';
import { Phone } from './Phone';
import { Billingaddress } from './Billingaddress';

export class Holder
{

    FullName: string;

    BirthDate: string;

    TaxDocument: TaxDocument;

    Phone: Phone;

    BillingAddress: Billingaddress;

    ThirdParty: boolean;
}
