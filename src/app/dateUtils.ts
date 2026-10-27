export const EARLIEST_CHECK_IN = "2026-11-01";
export const DEFAULT_CHECK_OUT_MIN = "2026-11-02";

/**
 * Calculates the next day for a given YYYY-MM-DD date string using UTC arithmetic.
 * This guarantees timezone safety across all client locales.
 */
export function getNextDay(dateString: string): string {
  if (!dateString) return DEFAULT_CHECK_OUT_MIN;
  const parts = dateString.split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) {
    return DEFAULT_CHECK_OUT_MIN;
  }
  const [year, month, day] = parts;
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().split("T")[0];
}

/**
 * Validates whether the given check-in date is on or after November 1, 2026.
 */
export function isCheckInDateValid(checkIn: string): boolean {
  if (!checkIn) return false;
  return checkIn >= EARLIEST_CHECK_IN;
}

/**
 * Validates whether the given check-out date is at least one day after check-in.
 */
export function isCheckOutDateValid(checkIn: string, checkOut: string): boolean {
  if (!checkIn || !checkOut) return false;
  return checkOut >= getNextDay(checkIn);
}
