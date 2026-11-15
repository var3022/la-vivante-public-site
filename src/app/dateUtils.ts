import { useSyncExternalStore } from "react";

/**
 * Returns today's date formatted as YYYY-MM-DD in the local timezone.
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Returns tomorrow's date formatted as YYYY-MM-DD in the local timezone.
 */
export function getTomorrowDateString(): string {
  return getNextDay(getTodayDateString());
}

/**
 * Calculates the next day for a given YYYY-MM-DD date string using UTC arithmetic.
 * This guarantees timezone safety across all client locales.
 */
export function getNextDay(dateString: string): string {
  if (!dateString) return "";
  const parts = dateString.split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) {
    return "";
  }
  const [year, month, day] = parts;
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().split("T")[0];
}

/**
 * Validates whether the given check-in date is on or after today.
 */
export function isCheckInDateValid(checkIn: string): boolean {
  if (!checkIn) return false;
  return checkIn >= getTodayDateString();
}

/**
 * Validates whether the given check-out date is at least one day after check-in.
 */
export function isCheckOutDateValid(checkIn: string, checkOut: string): boolean {
  if (!checkIn || !checkOut) return false;
  return checkOut >= getNextDay(checkIn);
}

const emptySubscribe = () => () => {};

/**
 * React hook to get today's date string safely without blocking Next.js static prerender.
 * Server snapshot returns empty string; client snapshot returns today in local time.
 */
export function useTodayDate(): string {
  return useSyncExternalStore(
    emptySubscribe,
    getTodayDateString,
    () => ""
  );
}

/**
 * Backwards compatibility aliases.
 */
export const EARLIEST_CHECK_IN = "2026-11-01";
export const DEFAULT_CHECK_OUT_MIN = "2026-11-02";
