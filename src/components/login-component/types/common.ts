export type FieldType = {
    email?: string;
    userName?: string;
    password?: string;
    phoneNumber?: string;
    isRemember?:boolean;
    activeCode?:string
};
export type IProps = {
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
};
export type IPropsEnterCode = {
    isNavigateEnterCode: boolean;
    email:string
    setIsRegister:React.Dispatch<React.SetStateAction<boolean>>
    setIsNavigateEnterCode:React.Dispatch<React.SetStateAction<boolean>>
}