




interface Agent {
  id: number
  code: string
  first_name: string
  last_name: string
  email: string
  phone_number: string
  created_at: string
  is_active: boolean
  user: UserProfile
}


interface Order {
  id: number
  agent: Agent
  business: Business
  product: ProductVariant
  agent_earning: string
  business_earning: string
  status: string
  created_at: string
}