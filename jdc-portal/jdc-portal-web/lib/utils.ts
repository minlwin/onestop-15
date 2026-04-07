import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const IMAGES = ["image/png", "image/jpeg", "image/jpg"]

export function option(array : string[]) {
    return array.map((item) => {
        return {
            value: item,
            label: item
        }
    })
}