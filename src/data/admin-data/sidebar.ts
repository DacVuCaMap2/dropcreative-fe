
import { ChartPie, CircleUserRound, Headset, Home, Package, UsersRound } from "lucide-react";

export const sideBarAdmin = [
    {
        title:"Main manager",
        listItems:[
            {
                name: "Home",
                href:"/admin/home",
                icon:Home,
                select:"home",
                role:[1,2,3]
            },
            {
                name: "Dashboard",
                href:"/",
                icon:ChartPie,
                select:"dashboard",
                role:[1,2,3]
            },
            {
                name: "Product",
                href:"/admin/all-product",
                icon:Package,
                select:"dashboard",
                role:[1,2,3]
            },
            {
                name: "Bill",
                href:"/",
                icon:ChartPie,
                select:"dashboard",
                role:[1,2,3]
            }
        ]
    },
    {
        title:"Account Manager",
        listItems:[
            {
                name: "User Manager",
                href:"/",
                icon:UsersRound,
                select:"dashboard",
                role:[1,2,3]
            },
            {
                name: "Profile",
                href:"/",
                icon:CircleUserRound,
                select:"dashboard",
                role:[1,2,3]
            },
            {
                name: "Customer Support",
                href:"/",
                icon:Headset,
                select:"dashboard",
                role:[1,2,3]
            }
        ]
    }

]