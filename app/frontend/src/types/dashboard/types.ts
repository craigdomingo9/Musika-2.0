




interface Agent {
  id: number
  code: string
  full_name: string
  first_name: string
  last_name: string
  email: string
  phone_number: string
  created_at: string
  is_active: boolean
  user: UserProfile,
  profile: AgentProfile
}

type AgentProfile = {
  id: number,
  bio: string,
  profile_picture: string,
  minimum_commission_rate: string,
  social_links: any,
  agent: Agent,
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

interface EditableCatalog {
  id: number,
  name: string,
  description: string,
  products: Product[],
  created_at: string,
}


type EntityAction<T> = {
  action: string,
  object?: T,
  state: "init" | "processing" | "completed",
}


type Relationship = {
  id: number,
  commission_rate: string,
  status: string,
  business: Business,
  agent: Agent,
  created_at: string
}

type AgentApplication = {
  id: number,
  commission_rate: string,
  status: string,
  agent: Agent,
  business: Business,
  created_at: string,
  updated_at: string,
}

type BusinessOffer = {
  id: number,
  title: string,
  description: string,
  agent: Agent,
  business: Business,
  offered_commission: string,
  expiration_date: string,
  available_slots: number,
  status: string,
  created_at: string,
  updated_at: string,
}

type Assignment = {
  id: number,
  agent: Agent,
  product: Product,
  assigned_at: string,
  status: "active" | "inactive"
}

type LeadSource = {
  short_name: string,
  name: string,
  description: string,
}


type Conversation = {
  id: number,
  uuid: string,
  participants: Participant[],
  conversation_type: "business_agent" | "customer_business" | "customer_platform" | "business_agent_platform",
  title: "Chat",
  created_at: string,
}

type Participant = {
  id: number,
  joined_at: string,
  conversation: Conversation,
  user: UserProfile,
  role: "customer" | "business" | "platform" | "agent"
}


type Message = {
  id: number,
  content: string,
  sent_at: string,
  was_read: boolean,
  was_read_at: string,
  conversation: number,
  sender: Participant,
}

