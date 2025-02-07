import { BellIcon, BookOpenCheckIcon, CoinsIcon, HandshakeIcon, ListCollapse, ListCollapseIcon, MessageCircleQuestionIcon, MessagesSquareIcon, TruckIcon, UserRoundPenIcon, UsersRoundIcon, type LucideIcon } from "lucide-react"


export interface LinkItem {
  title: string,
  url: string,
  icon?: LucideIcon,
}

interface Links extends LinkItem {
  items: LinkItem[]
}


const business: Links[] = [
  {
    title: "Workspace",
    url: "/dashboard/workspace",
    items: [
      {
        title: "Earnings",
        url: "/dashboard/earnings",
        icon: CoinsIcon
      },
      {
        title: "Inventory",
        url: "/dashboard/inventory",
        icon: ListCollapseIcon
      },
      {
        title: "Agents",
        url: "/dashboard/agents",
        icon: UsersRoundIcon,
      },
      {
        title: "Assignments",
        url: "/dashboard/assignments",
        icon: BookOpenCheckIcon,
      },
      {
        title: "Orders",
        url: "/dashboard/orders",
        icon: TruckIcon,
      },
      {
        title: "Communications",
        url: "/dashboard/comms/business",
        icon: MessagesSquareIcon,
      },
    ]
  },
  {
    title: "More",
    url: "/dashboard/more",
    items: [
      {
        title: "Notifications",
        url: "/dashboard/notifications",
        icon: BellIcon,
      },
      {
        title: "Profile",
        url: "/dashboard/profile",
        icon: UserRoundPenIcon,
      },
    ]
  },
  {
    title: "Help",
    url: "/dashboard/help",
    items: [
      {
        title: "Contact Support",
        url: "/dashboard/help/support",
        icon: MessageCircleQuestionIcon,
      },
    ]
  },
]


const agent: Links[] = [
  {
    title: "Workspace",
    url: "/dashboard/workspace",
    items: [
      {
        title: "Earnings",
        url: "/dashboard/earnings",
        icon: CoinsIcon,
      },
      {
        title: "Products",
        url: "/dashboard/assigned",
        icon: BookOpenCheckIcon,
      },
      {
        title: "Portfolio",
        url: "/dashboard/portfolio",
        icon: HandshakeIcon,
      },
      {
        title: "Communications",
        url: "/dashboard/comms/agent",
        icon: MessagesSquareIcon,
      },
    ]
  },
  {
    title: "More",
    url: "/dashboard/more",
    items: [
      {
        title: "Notifications",
        url: "/dashboard/notifications",
        icon: BellIcon,
      },
      {
        title: "Profile",
        url: "/dashboard/profile",
        icon: UserRoundPenIcon,
      },
    ]
  },
  {
    title: "Help",
    url: "/dashboard/help",
    items: [
      {
        title: "Contact Support",
        url: "/dashboard/help/support",
        icon: MessageCircleQuestionIcon,
      },
    ]
  },
]



export const getLinks = (mode: "agent" | "business", sectionTitle?: string) => {
  if (!mode) return;
  if (!sectionTitle) return mode.toLowerCase() === "agent" ? agent : business;

  const selectedSection = 
    mode.toLowerCase() === "agent" ? 
    agent.find(section => section.title == sectionTitle) 
    :
    business.find(section => section.title == sectionTitle);
  
  
  return selectedSection;
};


const getPathNameTitle = (obj: any[], target: string) => {
  let result: { 
    base: { 
      title: string; 
      url: string 
    } | null; 
    children: { 
      title: string; 
      url: string 
    }[] 
  } = {
    base: null, // Initialize base as null
    children: [],
  };

  for (const section of obj) {
    if (section.url === target) {
      result.base = { title: section.title, url: section.url };
      return result;
    }


    if (section.items) {
      for (const item of section.items) {
        if (item.url === target) {
          result.base = { title: section.title, url: section.url };
          result.children.push({ title: item.title, url: item.url });
          return result;
        }
      }
    }
  }

  return result;
};

export const getBreadCrumbs = (pathname: string) => {
  let result = getPathNameTitle(agent, pathname);

  if (!result.base?.title) {
    result = getPathNameTitle(business, pathname);
  }

  return result;
};


