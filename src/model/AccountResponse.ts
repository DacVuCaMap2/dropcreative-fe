class AccountResponse {
    id: any;
    name: string;
    email: string;
    avatar: string;
    role: string;

    constructor(id: any, name: string, email: string, avatar: string, role: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.avatar = avatar;
        this.role = role;
    }
}
export default AccountResponse;