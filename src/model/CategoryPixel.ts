import AccountResponse from "./AccountResponse";

export type FacebookPixelAccounts= {
    id:any,
    value:string,
    accountResponse:AccountResponse
}

export type FacebookPixel ={
    id:any,
    name:string,
    value:string,
    accessToken:string,
    facebookPixelAccounts:FacebookPixelAccounts[]
}

class CategoryPixel {
    id: any;
    name: string;
    facebookPixels: FacebookPixel[];

    constructor(id: any, name: string, facebookPixels: FacebookPixel[] = []) {
        this.id = id;
        this.name = name;
        this.facebookPixels = facebookPixels;
    }
}

export default CategoryPixel;
