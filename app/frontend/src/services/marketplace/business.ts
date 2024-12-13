



export function fixLogoImageUrl(url: string, business: Business) {
  const urlObject = new URL(url);

  const updatedBusiness = {
    ...business,
    profile: {
      ...business.profile,
      logo: `${urlObject.origin}${business.profile.logo}`
    }
  }

  return updatedBusiness
}
