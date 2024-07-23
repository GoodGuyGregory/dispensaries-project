export class SearchCriteria {
    strainEffect: string;
    strainFlavor: string;
    minRating: number;
    strainType: string;

    constructor(effect: string, flavor: string, rating: number, type: string) {
        this.strainEffect = effect;
        this.strainFlavor = flavor;
        this.minRating = rating;
        this.strainType = type;
    }
}