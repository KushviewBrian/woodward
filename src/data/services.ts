export type Service = {
  slug: string;
  name: string;
  shortName: string;
  symptomSummary: string;
  symptoms: string[];
  whatWeDo: string;
  costNote: string;
  timeNote: string;
  published: boolean;
};

export const services: Service[] = [
  {
    slug: 'engine-diagnostics',
    name: 'Engine Diagnostics',
    shortName: 'Diagnostics',
    symptomSummary: 'Warning lights, rough running, or something that just feels off',
    symptoms: [
      'The check engine light is on',
      'The car hesitates, stalls, or idles rough',
      'A new noise, smell, or vibration you can’t explain',
      'Reduced power or trouble accelerating',
      'The car passed everywhere fine before, and now something’s different',
    ],
    whatWeDo:
      'We pull the codes, but we don’t stop there — codes point at a system, not always the actual part. We trace it down to the real cause, explain what we found in plain language, and tell you what’s urgent versus what can wait.',
    costNote:
      'Diagnostic time varies with how the problem is hiding. We’ll tell you what to expect before we start digging.',
    timeNote: 'Straightforward codes are often same-day. Intermittent problems can take longer to chase down.',
    published: true,
  },
  {
    slug: 'brake-repair',
    name: 'Brake Repair',
    shortName: 'Brakes',
    symptomSummary: 'Grinding, squealing, or a pedal that doesn’t feel right',
    symptoms: [
      'Squealing or screeching when you brake',
      'A grinding sound — usually metal on metal, worth getting in soon',
      'The pedal feels soft, spongy, or sinks further than it used to',
      'The car pulls to one side when you brake',
      'A shudder or vibration through the pedal or steering wheel',
      'The brake warning light is on',
    ],
    whatWeDo:
      'We inspect pads, rotors, calipers, hoses, and fluid to find what’s actually worn — not just what’s easiest to swap. You’ll know what we found and what it costs before anything gets replaced.',
    costNote: 'Brake work depends on what’s worn. We inspect first, then give you a real number.',
    timeNote: 'Most brake jobs are done same-day once we know the parts needed.',
    published: true,
  },
  {
    slug: 'oil-changes-maintenance',
    name: 'Oil Changes & Maintenance',
    shortName: 'Oil & Maintenance',
    symptomSummary: 'Routine service to keep small problems from becoming big ones',
    symptoms: [
      'It’s been a while since your last oil change',
      'The maintenance reminder light is on',
      'You’re not sure what’s actually due on your car',
      'Getting ready for a road trip and want peace of mind',
      'You just want a second set of eyes on the basics',
    ],
    whatWeDo:
      'Oil and filter service, plus a plain-language look at the fluids, belts, and other wear items that tend to get missed. If something else needs attention, we’ll tell you — we won’t just do it without asking.',
    costNote: 'Straightforward, priced up front once we know your vehicle.',
    timeNote: 'Usually well under an hour.',
    published: true,
  },
  {
    slug: 'suspension-steering',
    name: 'Suspension & Steering',
    shortName: 'Suspension & Steering',
    symptomSummary: 'A rough ride, wandering steering, or uneven tire wear',
    symptoms: [
      'The ride feels bouncier or rougher than it used to',
      'Clunking or knocking over bumps',
      'The steering feels loose, or the car wanders on straight roads',
      'Uneven or rapid tire wear',
      'The car pulls or drifts to one side',
    ],
    whatWeDo:
      'We check shocks, struts, bushings, ball joints, and steering components to find where the play or wear actually is, and explain what’s affecting how the car handles and how it’s wearing the tires.',
    costNote: 'Depends on what’s worn — we’ll walk you through it after inspection.',
    timeNote: 'Varies by repair; we’ll give you a real estimate once we’ve inspected the car.',
    published: true,
  },
];

export const publishedServices = services.filter((s) => s.published);
