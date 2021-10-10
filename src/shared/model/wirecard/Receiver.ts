import { Amount } from './Amount';
import { Moipaccount } from './Moipaccount';

export class Receiver
{

    Type: string;

    FeePayor: boolean;

    MoipAccount: Moipaccount;

    Amount: Amount;
}
