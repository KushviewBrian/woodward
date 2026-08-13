export type FaqItem = {
  question: string;
  answer: string;
};

// Every answer here is a placeholder pending owner sign-off. See
// CONTENT-TODO.md before this ships publicly.
export const faqItems: FaqItem[] = [
  {
    question: 'Do I need an appointment, or can I just drop in?',
    answer:
      'Send a request or give us a call and we’ll find a time that works. [CONFIRM: do you take walk-ins, or is it appointment-only?]',
  },
  {
    question: 'How do estimates work? Will I know the cost before you start?',
    answer:
      '[CONFIRM: describe the estimate/approval process — e.g. we inspect, call you with a price, and don’t start work until you say go.]',
  },
  {
    question: 'Is there a fee for diagnosis? Does it apply toward the repair?',
    answer: '[CONFIRM: diagnostic fee policy — flat fee, waived if you proceed, etc.]',
  },
  {
    question: 'What payment methods do you accept?',
    answer: '[CONFIRM: cash, card, check, financing?]',
  },
  {
    question: 'Do you warranty your work?',
    answer: '[CONFIRM: warranty terms, if any.]',
  },
  {
    question: 'What makes and models do you work on?',
    answer:
      'Cars and light trucks, all makes and models. [CONFIRM: any exclusions — heavy duty, diesel, hybrid, EV?]',
  },
  {
    question: 'How long will my car be there?',
    answer:
      'It depends on the job. We’ll give you a realistic estimate once we’ve had a look. [CONFIRM: typical drop-off/pickup expectations.]',
  },
  {
    question: 'Can I drop my car off before you open, or pick it up after you close?',
    answer: '[CONFIRM: early drop-off / after-hours pickup policy, if any.]',
  },
  {
    question: 'Do you offer towing?',
    answer: '[CONFIRM: in-house towing, referral partner, or not offered.]',
  },
];
