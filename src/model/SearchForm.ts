import { homeDrop1, homeDropfirst } from "@/data/home-data/homeListData";

class SearchForm {
    type: any;
    category: any[];
    service: { Free: boolean, Premium: boolean };
    holiday: any[];
    season: any[];
    constructor(type: any, category: any[], service: { Free: boolean, Premium: boolean }, holiday: any[], season: any[]) {
        this.type = type;
        this.category = category;
        this.service = service;
        this.holiday = holiday;
        this.season = season;
    }
}
export default SearchForm;

export const getNewSearchForm = (): SearchForm => {
    const drop1 = homeDropfirst;
    return {
        type: drop1[0],
        category: [],
        service: { Free: true, Premium: false },
        holiday: [],
        season: []
    }
}
export const getSearchForm = (category:any[],holiday:any[],season:any[],type:number): SearchForm => {
    let drop1 = homeDropfirst.find(item=>item.value===type);
    drop1 = drop1 ? drop1 : homeDropfirst[0];
    return {
        type: drop1,
        category: category,
        service: { Free: true, Premium: false },
        holiday: holiday,
        season: season
    }
}