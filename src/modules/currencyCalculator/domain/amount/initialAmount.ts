import { amountValidation } from "./amountValidation";
import { Amount } from "./type";

const amount = 1;

export const initialAmount: Amount = amountValidation(amount) ? amount : 0;
