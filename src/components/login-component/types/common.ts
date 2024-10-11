export type FieldType = {
    email?: string;
    username?: string;
    password?: string;
    phoneNumber?: string;
    remember?:string;
    codeVerify?:string
};
export type IProps = {
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
};
export type IPropsEnterCode = {
    isNavigateEnterCode: boolean;
}