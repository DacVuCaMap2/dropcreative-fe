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
    expired?:number
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