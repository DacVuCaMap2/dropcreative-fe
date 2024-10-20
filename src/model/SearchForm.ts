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
    return {
        type: "Product",
        category: [],
        service: { Free: true, Premium: false },
        holiday: [],
        season: []
    }
}