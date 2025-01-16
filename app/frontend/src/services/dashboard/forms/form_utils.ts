


export function constructBody(values: Record<string, any>) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(values)) {
    if (!value) continue;
    
    formData.set(key, value);
  }
  return formData
}
