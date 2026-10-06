import type { OurTrip } from "./costa-rica";
import { costaRicaTrip } from "./costa-rica";
import { sudafricaMauricioTrip } from "./sudafrica-mauricio";

export const ourTrips: OurTrip[] = [
  costaRicaTrip,
  sudafricaMauricioTrip,
];

export function getOurTripBySlug(slug: string): OurTrip | undefined {
  return ourTrips.find((trip) => trip.slug === slug);
}
