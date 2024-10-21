export const generalCategoriesSelect = [
    {
        title: "Educational toys",
        value: 9
    },
    {
        title: "Sports & Outdoors",
        value: 8
    },
    {
        title: "Health & Wellness",
        value: 7
    },
    {
        title: "Books & Stationery",
        value: 6
    },
    {
        title: "Electronics",
        value: 5
    },
    {
        title: "Home & Kitchen",
        value: 4
    },
    {
        title: "Toys & Games",
        value: 3
    },
    {
        title: "Fashion",
        value: 1
    },
    {
        title: "Beauty & Personal Care",
        value: 2
    }
];

export const generalSeasonList = [
    {
        title:"Spring",
        value:0
    },
    {
        title:"Summer",
        value:1
    },
    {
        title:"Autumn (Fall)",
        value:2
    },
    {
        title:"Winter",
        value:3
    }
] 

export const generalHolidayList = [
    {
        title:"Christmas",
        value:1
    },
    {
        title:"Halloween",
        value:2
    },
    {
        title:"Thanksgiving",
        value:3
    },
    {
        title:"Easter",
        value:4
    }
    ,
    {
        title:"Valentine’s Day",
        value:5
    }
    ,
    {
        title:"Independence Day (July 4th)",
        value:6
    }
    ,
    {
        title:"Mother’s Day / Father’s Day",
        value:7
    }
    ,
    {
        title:"New Year’s Eve",
        value:8
    }
] 

export const gender = [
    {
        title:"All",
        value:0
    },
    {
        title:"Male",
        value:1
    },
    {
        title:"Female",
        value:2
    }
]



export const generalOptionHoliday = generalHolidayList.map(item=>{
    return{label:item.title,value:item.title,emoji:'',desc:item.title}
});

export const generalOptionsCat = generalCategoriesSelect.map(item=>{
    return{label:item.title,value:item.title,emoji:'',desc:item.title}
});

export const generalOptionSeasons = generalSeasonList.map(item=>{
    return{label:item.title,value:item.title,emoji:'',desc:item.title}
});

export const generalRoles = ['user_role','admin_role'];

export const generalServiceType = [
    {
        title:"Free",
        value:1
    },
    {
        title:"Premium",
        value:2
    },
    {
        title:"All",
        value:3
    },
    {
        title:"None",
        value:4
    }
]