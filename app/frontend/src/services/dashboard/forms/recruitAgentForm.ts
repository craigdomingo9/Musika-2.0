import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { roundNumber } from "@/lib/utils";


function createRecruitAgentSchema(minimumCommissionRate: string) {
  return z.object({
    offered_commission: z.string()
      .transform(val => parseFloat(val))
      .refine(val => val >= parseFloat(minimumCommissionRate), {
        message: `Commission rate must be at least ${minimumCommissionRate}%`,
    }).transform(val => (roundNumber(val / 100, 3)).toString())
  });
}

export const createRecruitAgentForm = (minimumCommissionRate: string) => {
  
  const schema = createRecruitAgentSchema(minimumCommissionRate);
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

