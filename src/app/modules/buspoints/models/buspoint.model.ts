export interface BasicBusPointRequestDto {
  name: string;
  address: string;
  busPointType: string;
}

export interface GetBusPointResponseDto extends BasicBusPointRequestDto {
  id: number;
}
