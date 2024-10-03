import { BookMarked, CookingPot, Gamepad2, HousePlus, Package, Shirt, Wand } from "lucide-react";

export const homeDrop1 = [
    {
        name: "Product",
        icon: Package,
        listSelect: [
            {
                name: "Fashion",
                icon: Shirt,
            },
            {
                name: "Beauty",
                icon: Wand
            },
            {
                name: "Gamming",
                icon: Gamepad2
            },
            {
                name: "Kitchen",
                icon: CookingPot
            },
            {
                name: "Home decor",
                icon: HousePlus
            },
            {
                name: "Office Supplies",
                icon: BookMarked
            }

        ],
        listCheckbox: ["Free", "Premium"]
    }
]

export const homeCategories = [
    {
        title: "Fashion",
        img: "/categories/fashion.png",
        url: "/fashion" // Thay đổi đường dẫn URL nếu cần
    },
    {
        title: "Beauty",
        img: "/categories/beauty.png",
        url: "/beauty" // Thay đổi đường dẫn URL nếu cần
    },
    {
        title: "Gaming",
        img: "/categories/gaming.png",
        url: "/gaming" // Thay đổi đường dẫn URL nếu cần
    },
    {
        title: "Kitchen",
        img: "/categories/kitchen.png",
        url: "/kitchen" // Thay đổi đường dẫn URL nếu cần
    },
    {
        title: "Home Decor",
        img: "/categories/home-decor.png",
        url: "/home-decor" // Thay đổi đường dẫn URL nếu cần
    },
    {
        title: "Office Supplies",
        img: "/categories/office-supplies.png",
        url: "/office-supplies" // Thay đổi đường dẫn URL nếu cần
    }
];

export const homeTheme = [
    {
        title: "Halloween theme",
        img: "/hometheme/halloween.png"
    },
    {
        title: "Pink theme",
        img: "/hometheme/pink.png"
    },
    {
        title: "Christmas theme",
        img: "/hometheme/christmas.png"
    },
    {
        title: "Christmas theme",
        img: "/hometheme/christmas.png"
    },
    {
        title: "AI generator",
        img: "/hometheme/ai-generator.png"
    },
    {
        title: "Fall theme",
        img: "/hometheme/fall.png"
    },
]

export const homeCountry = [
    {
        title: "USA area",
        count:92,
        img1: "/homecountry/USA1.png",
        img2: "/homecountry/USA2.png",
        img3: "/homecountry/USA3.png"
    },
    {
        title: "Canada area",
        count:92,
        img1: "/homecountry/canada1.png",
        img2: "/homecountry/canada2.png",
        img3: "/homecountry/canada3.png"
    },
    {
        title: "Euro area",
        count:92,
        img1: "/homecountry/euro1.png",
        img2: "/homecountry/euro2.png",
        img3: "/homecountry/euro3.png"
    },
    {
        title: "Asia area",
        count:92,
        img1: "/homecountry/asia1.png",
        img2: "/homecountry/asia2.png",
        img3: "/homecountry/asia3.png"
    },
]