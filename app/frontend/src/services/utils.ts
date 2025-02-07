


export function correctImageUrl(imageUrl: string | undefined, globalUrl: string) {
  if (!imageUrl) return ""
  const urlObject = new URL(globalUrl);

  return urlObject.origin + imageUrl
}




