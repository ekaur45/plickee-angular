export class PersonalInfoModel{
    firstName?:string;
    lastName?:string;
    email?:string;
    password?:string;
}
export class PackageInfoModel{}
export class PaymentModel{}
export class SignupModel{
    personalInfo:PersonalInfoModel = new PersonalInfoModel();
    packageInfo:PackageInfoModel = new PackageInfoModel();
    payment:PaymentModel = new PaymentModel();
}