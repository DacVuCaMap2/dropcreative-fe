export type TypeLogin ={
    email:string,
    password:string,
    isRemember:boolean
}
export type TypeResponse =  {
    status: number;
    message: string;
    jwt?:string;
    id:number;
    expired?:number;
    role:string;
    userName:string;
    email:string;
}
export type TypeRegister ={
    email:string,
    password:string,
    userName:string,
    phoneNumber:string
}

export type CookieOptions = {
    [key: string]: string | boolean;
};
export type SelectOption = {
    title:string,
    value:number
}
export type ParamsSearchProduct = {
    page:number,
    size:number,
    search:string,
    accountId:number,
    holiday?:number[],
    season?:number[],
    category?:number[]
}
export type DataSearch = {
    dataSearch:any
    isOpenFilter:boolean
}