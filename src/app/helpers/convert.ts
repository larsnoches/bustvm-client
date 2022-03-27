import {
  BusPointType,
  BusPointTypeResponseDto,
  BusPointsByTypeResponseDto,
} from '@modules/buspoint-types/models/buspoint-type.model';

export const convert = {
  busPointTypeFromDto,
  busPointTypeAndBusPointsFromDto,
};

function busPointTypeFromDto(dto: BusPointTypeResponseDto): BusPointType {
  return {
    id: dto.id,
    name: dto.name,
    href: dto._links?.self.href,
  };
}

function busPointTypeAndBusPointsFromDto(
  bpt: BusPointType,
  dto: BusPointsByTypeResponseDto,
): BusPointType | null {
  const { _embedded } = dto;
  if (_embedded == null) return bpt;

  return {
    ...bpt,
    busPoints: _embedded?.busPoints?.map(b => ({
      id: b.id,
      name: b.name,
      address: b.address,
      href: b._links?.self.href,
    })),
  };
}
