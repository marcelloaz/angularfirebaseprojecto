import { Creditcard } from './Creditcard';
import { Boleto } from './Boleto';
import { Onlinebankdebit } from './Onlinebankdebit';
export class Fundinginstrument {
  Method: string;
  CreditCard: Creditcard;
  Brand: string;
  Boleto: Boleto;
  OnlineBankDebit: Onlinebankdebit;
}
