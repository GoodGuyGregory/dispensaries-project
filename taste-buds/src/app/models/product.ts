
export class Product {
    DispensaryId: string;
    DispensaryName: string;
    State: string;
    DispensaryRating: string;
    Name: string;
    BrandName: string;
    StrainName: string;
    StrainType: string;
    Description: string;
    ProductImage: string;
    BrandLogo: string;
    Category: string;
    Price: string;
    UnitSize: string;

    constructor(name: string, category: string, state: string, type: string, strainName: string, brand: string) {
        this.Name = name;
        this.Category = category;
        this.State = state;
        // optional:
        if (this.StrainName != '') {
            this.StrainName = strainName;
        }
        if (this.BrandName != '') {
            this.BrandName = brand;
        }
        if (this.StrainType != '') {
            this.StrainType = type;
        }
    }
}