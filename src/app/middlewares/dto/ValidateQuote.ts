import { IsNumber, IsString } from 'class-validator';

export class ValidateQuote {
  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsNumber()
  amount: number;
}
