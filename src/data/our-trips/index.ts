import type { OurTrip } from "./costa-rica";
import { costaRicaTrip } from "./costa-rica";

export const ourTrips: OurTrip[] = [
  costaRicaTrip,
];

export function getOurTripBySlug(slug: string): OurTrip | undefined {
  return ourTrips.find((trip) => trip.slug === slug);
}
