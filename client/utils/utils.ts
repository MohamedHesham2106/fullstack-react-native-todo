import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  // Use `twMerge` to apply Tailwind CSS class name merging if applicable
  return twMerge(clsx(inputs));
}
