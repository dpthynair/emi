import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getAssetPath = (assetName: string): string => {
  const basePath = import.meta.env.VITE_BASE_PATH || '/';
  return `${basePath}${assetName.startsWith('/') ? assetName.slice(1) : assetName}`;
};