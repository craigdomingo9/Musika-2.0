

export default class BusinessServices {
  private _business: Business;

  constructor(business: Business) {
    this._business = business;
  }

  business() {
    return this._business
  }

  fixLogoImageUrl(url: string) {
    const urlObject = new URL(url);

    const updatedBusiness = {
      ...this._business,
      profile: {
        ...this._business.profile,
        logo: `${urlObject.origin}${this._business.profile.logo}`
      }
    }

    this._business = updatedBusiness;
  }

}