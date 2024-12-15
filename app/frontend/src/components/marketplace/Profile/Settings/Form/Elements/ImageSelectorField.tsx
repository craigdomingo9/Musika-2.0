import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<any, any, undefined>,
  fieldName: string,
  label: string,
}

function ImageSelectorField({form, fieldName, label}: Props) {

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
        const file = event.target.files[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        // setImagePreview(previewUrl);
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
                />
                {/* {imagePreview && (
                    <Image
                      src={imagePreview}
                      alt="Image Preview"
                      height={1000}
                      width={1000}
                      className="mt-4 border rounded-full mx-auto w-80 h-80 object-cover"
                      priority
                    />
                )} */}
              </div>
            </FormControl>
          <FormMessage />
        </FormItem>
        )}
        />
  )
}

export default ImageSelectorField