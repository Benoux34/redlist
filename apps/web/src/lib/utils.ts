import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function collapsibleClass(isOpen: boolean): string {
  return cn(
    "grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none",
    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
  );
}
