export type TypeLogin ={
    email:string,
    password:string,
    isRemember:boolean
}
export type TypeResponse =  {
    status: number;
    message: string;
}
export type TypeRegister ={
    email:string,
    password:string,
    userName:string,
    phoneNumber:string
}