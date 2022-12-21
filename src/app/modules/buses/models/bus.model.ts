export interface BasicBusRequestDto {
  makeModel: string;
  manufacturerCountry: string;
  yearOfManufacture: number;
  seatCount: number;
  regNumber: string;
  carrier: number; // carrier id
}

export interface GetBusResponseDto extends BasicBusRequestDto {
  id: number;
}
