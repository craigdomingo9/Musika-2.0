


export function correctImageUrl(imageUrl: string, globalUrl: string) {
  const urlObject = new URL(globalUrl);

  return urlObject.origin + imageUrl
}




