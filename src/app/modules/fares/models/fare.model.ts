export interface BasicFareRequestDto {
  name: string;
  price: number;
  carrier: number;
}

export interface GetFareResponseDto extends BasicFareRequestDto {
  id: number;
}
