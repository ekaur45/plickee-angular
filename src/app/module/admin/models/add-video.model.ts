class AddVideoModel{
    title?:string;
    description?:string;
    thumbnail?:any;
    file?:any;
    category?:MovieCategoryEnum;
    quality?:MovieQualityEnum;
    releaseYear?:number;
    language?:MovieLanguageEnum;
    duration?:number;
}
enum MovieCategoryEnum{
    Comedy = 1,
    Crime = 2,
    Drama = 3,
    Horor = 4,
    Romance = 5
}
enum MovieQualityEnum{
    FullHD = 1,
    HD = 2
}
enum MovieLanguageEnum{
    English = 1,
    Urdu =2
}
export {AddVideoModel,MovieCategoryEnum,MovieQualityEnum,MovieLanguageEnum}