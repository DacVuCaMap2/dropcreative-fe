import { BookMarked, CookingPot, Gamepad2, HousePlus, Package, Shirt, Wand } from "lucide-react";

export const homeDrop1 = [
    {
        name:"Product",
        icon:Package,
        listSelect:[
            {
                name:"Fashion",
                icon:Shirt,
            },
            {
                name:"Beauty",
                icon:Wand
            },
            {
                name:"Gamming",
                icon:Gamepad2 
            },
            {
                name:"Kitchen",
                icon:CookingPot  
            },
            {
                name:"Home decor",
                icon:HousePlus 
            },
            {
                name:"Office Supplies",
                icon:BookMarked 
            }
            
        ],
        listCheckbox:["Free","Premium"]
    }
]

const homeDrop3 = [];