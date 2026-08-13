export type Review = {
  quote: string;
  attribution: string;
  source: 'Google' | 'Yelp' | 'Facebook';
  date: string;
  profileUrl: string;
  service?: string;
};

// Intentionally empty at launch. Do not fabricate reviews or paraphrase
// public listings without written permission — see docs/spec.md §8
// ("Reviews workflow") and CONTENT-TODO.md. Add entries here once the
// owner has approved specific excerpts and sources.
export const reviews: Review[] = [];
