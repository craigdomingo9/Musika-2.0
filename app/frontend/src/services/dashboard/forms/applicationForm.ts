import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { roundNumber } from "@/lib/utils";


function createApplicationSchema(minimumCommissionRate: string) {
  return z.object({
    commission_rate: z.string()
      .transform(val => parseFloat(val))
      .refine(val => val >= parseFloat(minimumCommissionRate), {
        message: `You set your minimum to ${minimumCommissionRate}%. Change it in profile settings.`,
    }).transform(val => (roundNumber(val / 100, 3)).toString())
  });
}

export const createApplicationForm = (minimumCommissionRate: string) => {
  
  const schema = createApplicationSchema(minimumCommissionRate);
  return useForm({
    resolver: zodResolver(schema),
  });
};

export function constructBody(values: Record<string, any>) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(values)) {
    if (!value) continue;
    
    formData.set(key, value);
  }

  return formData
}

