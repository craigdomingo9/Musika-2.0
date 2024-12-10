import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function trunc(string: string ,max_length?: number): string {
  if (!max_length) return string;
  if (string.length < max_length) return string;

  return string.substring(0, max_length) + "...";
}

export function roundNumber(number: number, decimalPlaces: number) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(number * factor) / factor;
}