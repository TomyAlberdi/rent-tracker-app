import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMonthName(month: number) {
  switch (month) {
    case 1:
      return "En";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Abr";
    case 5:
      return "May";
    case 6:
      return "Jun";
    case 7:
      return "Jul";
    case 8:
      return "Ago";
    case 9:
      return "Sep";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return "Dic";
    default:
      return "";
  }
}

export function getFillColor(index: number) {
  if (index + 1 <= 5) {
    return `var(--chart-${index + 1})`;
  } else if (index + 1 === 6) {
    return `var(--ring)`;
  }
  return `var(--muted-foreground)`;
}
