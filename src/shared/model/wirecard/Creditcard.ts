import { Phone } from './Phone';
import { Holder } from './Holder';

export class Creditcard
    {
        Id: string;

        Brand: string;

        First6: string;

        Last4: string;

        Store: boolean;

        ExpirationMonth: string;

        ExpirationYear: string;

        Number: string;

        Cvc: string;

        Holder: Holder;

        Hash: string;

        Phone: Phone;
    }
