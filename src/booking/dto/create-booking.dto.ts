import { IsString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsString()
  coworkingSpaceId: string;
}
