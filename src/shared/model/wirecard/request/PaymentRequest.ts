import { Fundinginstrument } from '../Fundinginstrument';

export class PaymentRequest
{
    InstallmentCount: string;
    statementDescriptor: string;
    delayCapture: string;
    fundingInstrument: Fundinginstrument;
    fingerprint: string;
}
