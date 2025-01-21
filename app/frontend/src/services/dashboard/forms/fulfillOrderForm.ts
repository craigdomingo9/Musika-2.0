import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


function createFulfillOrderSchema() {
  return z.object({
    fulfillment_code: z.string()
      .min(8)
      .max(8)
      .transform((val) => val.toUpperCase())
      .refine(
        (value) => /^[A-Z]+[-'s]?[A-Z ]+$/.test(value ?? ''), 
        { message: 'Fulfillment code should contain only uppercase alphabets, hyphens, apostrophes, and spaces.' } 
      )
  });
}

export const createFulfillOrderForm = () => {
  
  const schema = createFulfillOrderSchema();
  return useForm({
    resolver: zodResolver(schema),
  });
};
