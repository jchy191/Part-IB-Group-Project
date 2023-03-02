import { Category } from './category';

export default interface Marker {
  placeId: string,
  latLng: google.maps.LatLngLiteral,
  address: string,
  name: string,
  [Category.A]: boolean,
  [Category.B]: boolean,
  [Category.C]: boolean,
  [Category.D]: boolean,
  [Category.E]: boolean,
}
