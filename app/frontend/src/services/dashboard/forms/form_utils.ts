import FormData from 'form-data';




export const constructBody = (data: any): FormData => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (!value) continue;

    if (value instanceof File) {
      // Handle file uploads
      formData.append(key, value);
    } else if (typeof value === 'object' && value !== null) {
      // Handle nested objects
      for (const [nestedKey, nestedValue] of Object.entries(value)) {
        if (typeof nestedValue === 'object' && nestedValue !== null) {
          // Handle nested objects within nested objects
          for (const [deepNestedKey, deepNestedValue] of Object.entries(nestedValue)) {
            if (deepNestedValue !== undefined) {
              formData.append(`${key}.${nestedKey}.${deepNestedKey}`, deepNestedValue);
            }
          }
        } else if (nestedValue !== undefined) {
          formData.append(`${key}.${nestedKey}`, nestedValue);
        }
      }
    } else if (value !== undefined) {
      formData.append(key, value);
    }
  }

  return formData;
};
