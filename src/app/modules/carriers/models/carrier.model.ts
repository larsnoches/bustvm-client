export interface BasicCarrierRequestDto {
  name: string;
  inn: string;
  address: string;
}

export interface GetCarrierResponseDto extends BasicCarrierRequestDto {
  id: number;
}
