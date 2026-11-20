import { HOURS, RESTAURANT } from './restaurant.config';
import { WEEKDAYS } from './hours';

/** schema.org Restaurant data for search engines, built from the same config as the visible site. */
export function restaurantJsonLd() {
  const { address, location } = RESTAURANT;
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: `${RESTAURANT.name} ${RESTAURANT.descriptor}`,
    description: RESTAURANT.tagline,
    servesCuisine: ['Japanese', 'Sushi'],
    telephone: RESTAURANT.phone,
    email: RESTAURANT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      postalCode: address.postalCode,
      addressLocality: address.city,
      addressCountry: address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: location.lat, longitude: location.lng },
    openingHoursSpecification: Object.entries(HOURS).flatMap(([day, ranges]) =>
      ranges.map(([opens, closes]) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: WEEKDAYS[+day], opens, closes })),
    ),
    priceRange: '€€€',
  };
}
