import { url } from "inspector";
import { BookMarked, CookingPot, Gamepad2, HeartPulse, HousePlus, Image, Medal, Package, Shapes, Shirt, Video, Wand } from "lucide-react";

export const homeDrop1 = [
    {
        name: "Product",
        icon: Package,
        listSelect: [
            {
                name: "Fashion",
                icon: Shirt,
                value: 1
            },
            {
                name: "Beauty & Personal Care",
                icon: Wand,
                value: 2
            },
            {
                name: "Toys & Games",
                icon: Gamepad2,
                value: 3
            },
            {
                name: "Home & Kitchen",
                icon: CookingPot,
                value: 4
            },
            {
                name: "Electronics",
                icon: HousePlus,
                value: 5
            },
            {
                name: "Books & Stationery",
                icon: BookMarked,
                value: 6
            },
            {
                name: "Health & Wellness",
                icon: HeartPulse,
                value: 7
            },
            {
                name: "Sports & Outdoors",
                icon: Medal,
                value: 8
            },
            {
                name: "Educational toys",
                icon: Shapes,
                value: 9
            }

        ],
        listCheckbox: ["Free", "Premium"]
    }
]


export const homeDropfirst = [
    {
        title: "Product",
        icon: Package,
        value: 0
    },
    {
        title: "Image",
        icon: Image,
        value: 1
    },
    {
        title: "Video",
        icon: Video,
        value: 2
    },
]

export const homeDropSecond = [
    {
        title: "Fashion",
        icon: Shirt,
        value: 1
    },
    {
        title: "Beauty & Personal Care",
        icon: Wand,
        value: 2
    },
    {
        title: "Toys & Games",
        icon: Gamepad2,
        value: 3
    },
    {
        title: "Home & Kitchen",
        icon: CookingPot,
        value: 4
    },
    {
        title: "Electronics",
        icon: HousePlus,
        value: 5
    },
    {
        title: "Books & Stationery",
        icon: BookMarked,
        value: 6
    },
    {
        title: "Health & Wellness",
        icon: HeartPulse,
        value: 7
    },
    {
        title: "Sports & Outdoors",
        icon: Medal,
        value: 8
    },
    {
        title: "Educational toys",
        icon: Shapes,
        value: 9
    }
]
export const homeDropThird = ["Free", "Premium"];


export const homeCategories = [
    {
        title: "Fashion",
        img: "/categories/fashion.png",
        url: "/search?category=1"
    },
    {
        title: "Beauty & Personal Care",
        img: "/categories/beauty.png",
        url: "/search?category=2"
    },
    {
        title: "Toys & Games",
        img: "/categories/gaming.png",
        url: "/search?category=3"
    },
    {
        title: "Home & Kitchen",
        img: "/categories/kitchen.png",
        url: "/search?category=4"
    },
    {
        title: "Electronics",
        img: "/categories/home-decor.png",
        url: "/search?category=5"
    },
    {
        title: "Books & Stationery",
        img: "/categories/office-supplies.png",
        url: "/search?category=6"
    },
    {
        title: "Health & Wellness",
        img: "/categories/health.png",
        url: "/search?category=7"
    },
    {
        title: "Sports & Outdoors",
        img: "/categories/sport.png",
        url: "/search?category=8"
    },
    {
        title: "Educational toys",
        img: "/categories/education.png",
        url: "/search?category=9"
    }

];

export const homeTheme = [
    {
        title: "Halloween theme",
        img: "/hometheme/halloween.png",
        url:"/search?holiday=2"
    },
    {
        title: "Easter theme",
        img: "/hometheme/easter.png",
        url:"/search?holiday=4"
        
    },
    {
        title: "Thanksgiving theme",
        img: "/hometheme/thankgiving.png",
        url:"/search?holiday=3"
    },
    {
        title: "Christmas theme",
        img: "/hometheme/christmas.png",
        url:"/search?holiday=1"
    },
    {
        title: "Valentine’s Day",
        img: "/hometheme/valentine.png",
        url:"/search?holiday=5"
    },
    {
        title: "Independence Day",
        img: "/hometheme/independence.png",
        url:"/search?holiday=6"
    },
    {
        title: "New Year’s Eve",
        img: "/hometheme/newyear.png",
        url:"/search?holiday=8"
    },
    {
        title: "Mother’s Day / Father’s Day",
        img: "/hometheme/parent.png",
        url:"/search?holiday=7"
    },
    {
        title: "All Holiday",
        img: "/hometheme/all.png",
        url:"/search"
    }
]

export const homeCountry = [
    {
        title: "US area",
        count: 92,
        img1: "/homecountry/USA1.png",
        img2: "/homecountry/USA2.png",
        img3: "/homecountry/USA3.png",
        url: "/search"
    },
    {
        title: "Euro area",
        count: 92,
        img1: "/homecountry/euro1.png",
        img2: "/homecountry/euro2.png",
        img3: "/homecountry/euro3.png",
        url: "/search"
    },
    {
        title: "AU area",
        count: 92,
        img1: "/homecountry/au1.png",
        img2: "/homecountry/au2.png",
        img3: "/homecountry/au3.png",
        url: "/search"
    },
    {
        title: "Asia area",
        count: 92,
        img1: "/homecountry/asia1.png",
        img2: "/homecountry/asia2.png",
        img3: "/homecountry/asia3.png",
        url: "/search"
    },
]