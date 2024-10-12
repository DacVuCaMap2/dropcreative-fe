import { CookieOptions } from "@/types/common";

export const setCookie = (
    name: string,
    value: string,
    options: CookieOptions = {}
  ): void => {
    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  
    for (const optionKey in options) {
      if (options.hasOwnProperty(optionKey)) {
        updatedCookie += `; ${optionKey}`;
        const optionValue = options[optionKey];
        if (optionValue !== true) {
          updatedCookie += `=${optionValue}`;
        }
      }
    }
  
    document.cookie = updatedCookie;
};
  