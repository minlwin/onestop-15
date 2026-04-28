import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const IMAGES = ["image/png", "image/jpeg", "image/jpg"]

export function formData(object: { [key: string]: any }) {
  const formData = new FormData()
  Object.entries(object).forEach(([key, value]) => {
    if(Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        formData.append(key, value[i]);
      }
    } else {
      formData.append(key, value);
    }
  });
  return formData
}