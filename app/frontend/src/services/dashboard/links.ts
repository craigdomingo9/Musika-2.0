

export interface LinkItem {
  title: string,
  url: string,
  icon?: any
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
      },
      {
        title: "Inventory",
        url: "/dashboard/inventory",
      },
      {
        title: "Agents",
        url: "/dashboard/agents",
      },
      {
        title: "Assignments",
        url: "/dashboard/assignments",
      },
      {
        title: "Orders",
        url: "/dashboard/orders",
      },
      {
        title: "Communications",
        url: "/dashboard/comms/business",
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
      },
      {
        title: "Profile",
        url: "/dashboard/profile",
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
      },
      {
        title: "Products",
        url: "/dashboard/assigned",
      },
      {
        title: "Portfolio",
        url: "/dashboard/portfolio",
      },
      {
        title: "Communications",
        url: "/dashboard/comms/agent",
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
      },
      {
        title: "Profile",
        url: "/dashboard/profile",
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
  
    console.log(selectedSection)
  
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


