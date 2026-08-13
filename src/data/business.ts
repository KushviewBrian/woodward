// Single source of truth for shop info. Every page, the footer, and the
// JSON-LD block all read from here so the NAP can't drift between pages.

export const business = {
  name: 'Woodward Automotive',
  legalName: 'Woodward Automotive LLC',
  streetAddress: '3909 Fourier Dr, Suite E',
  city: 'Fort Wayne',
  state: 'IN',
  zip: '46818',
  phoneDisplay: '(260) 710-8995',
  phoneHref: 'tel:+12607108995',
  phoneE164: '+1-260-710-8995',
  // TODO(owner): confirm a monitored inbox before the form goes live.
  email: 'service@woodwardautomotivellc.com',
  mapsQuery: 'Woodward+Automotive+3909+Fourier+Dr+Suite+E+Fort+Wayne+IN+46818',
  facebookUrl: 'https://www.facebook.com/p/Woodward-Automotive-100083099090697/',
  hours: [
    { day: 'Monday', open: '10:00', close: '18:00' },
    { day: 'Tuesday', open: '10:00', close: '18:00' },
    { day: 'Wednesday', open: '10:00', close: '18:00' },
    { day: 'Thursday', open: '10:00', close: '18:00' },
    { day: 'Friday', open: '10:00', close: '18:00' },
  ],
  hoursDisplay: 'Mon–Fri, 10 AM–6 PM',
  timezone: 'America/Indiana/Indianapolis',
} as const;

export const fullAddress = `${business.streetAddress}, ${business.city}, ${business.state} ${business.zip}`;
