import { CookieOptions } from "@/types/common";

export const setCookie = (
    name: string,
    value: string | number,
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
export const deleteAllCookies = () =>  {
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}