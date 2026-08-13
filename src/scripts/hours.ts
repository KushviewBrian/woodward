import { business } from '../data/business';

const dayIndex: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

function partsInZone(date: Date, timeZone: string) {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  });
  const parts = fmt.formatToParts(date);
  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? 'Monday';
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? '0');
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? '0');
  return { weekday, minutesOfDay: hour * 60 + minute };
}

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

export type OpenStatus = {
  isOpen: boolean;
  label: string;
};

export function getOpenStatus(now: Date = new Date()): OpenStatus {
  const { weekday, minutesOfDay } = partsInZone(now, business.timezone);
  const today = business.hours.find((h) => h.day === weekday);

  if (today) {
    const open = toMinutes(today.open);
    const close = toMinutes(today.close);
    if (minutesOfDay >= open && minutesOfDay < close) {
      const closeHour = Math.floor(close / 60);
      const closeLabel = closeHour > 12 ? `${closeHour - 12} PM` : `${closeHour} AM`;
      return { isOpen: true, label: `Open until ${closeLabel}` };
    }
  }

  // Find the next day (starting today) that has hours and hasn't passed yet.
  const todayIdx = dayIndex[weekday];
  for (let offset = 0; offset < 7; offset++) {
    const checkIdx = (todayIdx + offset) % 7;
    const dayName = Object.keys(dayIndex).find((d) => dayIndex[d] === checkIdx);
    const entry = business.hours.find((h) => h.day === dayName);
    if (!entry) continue;
    if (offset === 0 && toMinutes(entry.open) <= minutesOfDay) continue;

    const openHour = Math.floor(toMinutes(entry.open) / 60);
    const openLabel = openHour > 12 ? `${openHour - 12} PM` : `${openHour} AM`;
    const dayLabel = offset === 0 ? 'today' : offset === 1 ? 'tomorrow' : entry.day;
    return { isOpen: false, label: `Closed — opens ${dayLabel} at ${openLabel}` };
  }

  return { isOpen: false, label: 'Closed' };
}
