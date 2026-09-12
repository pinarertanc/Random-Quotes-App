import { myQuotesProps } from "./quotes";

export interface HomeProps{
  initialQuotes: myQuotesProps[],
  userId?: string;
}