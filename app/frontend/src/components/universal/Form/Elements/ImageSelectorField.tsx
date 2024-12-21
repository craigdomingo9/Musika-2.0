import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<any, any, undefined>,
  defaultImage?: string,
  fieldName: string,
  label: string,
}

function ImageSelectorField({form, defaultImage, fieldName, label}: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!defaultImage) return;

    const correctImageUrl = () => {
      const urlObject = new URL(window.location.href);
      setImagePreview(urlObject.origin + defaultImage)
    }
    correctImageUrl()
  }, [defaultImage])
  


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
        const file = event.target.files[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
      }
    }
  };

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field : { onChange} }) => (
        <FormItem>
          <FormLabel className="text-opacity font-semibold">{label}</FormLabel>
            <FormControl>
              <div className="grid">
                <Input
                  type="file" 
                  accept="image/*" 
                  className="file-input text-xs"
                  onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                          onChange(e.target.files[0]); // Set the first file
                          handleImageChange(e);
                      }
                  }}
                  id="profile_picture"
                />
                <FormLabel htmlFor="profile_picture" className="cursor-pointer">
                  {imagePreview && (
                      <Image
                        src={imagePreview}
                        alt="Image Preview"
                        height={1000}
                        width={1000}
                        className="mt-4 border rounded-full mx-auto p-2 w-80 max-w-80 h-80 max-h-80 object-cover"
                        unoptimized
                        priority
                      />
                  )}
                </FormLabel>

              </div>
            </FormControl>
          <FormMessage />
        </FormItem>
        )}
        />
  )
}

export default ImageSelectorField