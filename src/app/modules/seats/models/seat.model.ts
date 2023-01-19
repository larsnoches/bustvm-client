import { GetBusTripResponseDto } from '@modules/bustrips/models/bustrip.model';

export interface BasicSeatRequestDto {
  name: string;
  seatIsOccupied: boolean;
  busTrip: number;
}

export interface GetSeatResponseDto {
  id: number;
  name: string;
  seatIsOccupied: boolean;
  busTrip: GetBusTripResponseDto;
}
