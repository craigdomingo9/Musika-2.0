
const business: any = [
  {
    title: "Overview",
    url: "/dashboard/overview",
  },
  {
    title: "Workspace",
    url: "",
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
        title: "Communications",
        url: "/dashboard/comms/business",
      },
    ]
  },
  {
    title: "Analytics",
    url: "",
    items: [
      {
        title: "Sales Analytics",
        url: "/dashboard/analytics/sales",
      },
      // {
      //   title: "Customer Insights",
      //   url: "/dashboard/analytics/insights",
      // },
      {
        title: "Product Performance",
        url: "/dashboard/analytics/products",
      },
      // {
      //   title: "Reports",
      //   url: "/dashboard/analytics/reports",
      // },
    ]
  },
  {
    title: "More",
    url: "",
    items: [
      {
        title: "Notifications",
        url: "/dashboard/notifications",
      },
      // {
      //   title: "Financials",
      //   url: "/dashboard/financials",
      // },
      // {
      //   title: "Subscriptions",
      //   url: "/dashboard/subscriptions",
      // },
      {
        title: "Profile",
        url: "/dashboard/profile",
      },
    ]
  },
  {
    title: "Help",
    url: "",
    items: [
      {
        title: "Contact Support",
        url: "/dashboard/help/support",
      },
      // {
      //   title: "Guides",
      //   url: "/dashboard/help/guides",
      // },
      // {
      //   title: "FAQs",
      //   url: "/dashboard/help/faqs",
      // },
    ]
  },
]

const agent: any = [
  {
    title: "Overview",
    url: "/dashboard/overview",
  },
  {
    title: "Workspace",
    url: "",
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
    title: "Analytics",
    url: "",
    items: [
      {
        title: "Performance",
        url: "/dashboard/analytics/performance",
      },
      // {
      //   title: "Customer Insights",
      //   url: "/dashboard/analytics/insights",
      // },
      {
        title: "Leads Insights",
        url: "/dashboard/analytics/leads",
      },
      // {
      //   title: "Growth Metrics",
      //   url: "/dashboard/analytics/growth",
      // },
      // {
      //   title: "Reports",
      //   url: "/dashboard/analytics/reports",
      // },
    ]
  },
  {
    title: "More",
    url: "",
    items: [
      {
        title: "Notifications",
        url: "/dashboard/notifications",
      },
      // {
      //   title: "Financials",
      //   url: "/dashboard/financials",
      // },
      // {
      //   title: "Subscriptions",
      //   url: "/dashboard/subscriptions",
      // },
      {
        title: "Profile",
        url: "/dashboard/profile",
      },
    ]
  },
  {
    title: "Help",
    url: "",
    items: [
      {
        title: "Contact Support",
        url: "/dashboard/support",
      },
      // {
      //   title: "Guides",
      //   url: "/dashboard/guides",
      // },
      // {
      //   title: "FAQs",
      //   url: "/dashboard/faqs",
      // },
    ]
  },
]



export const getLinks = (mode: "agent" | "business") => {
  return mode.toLowerCase() === "agent" ? agent : business;
};



const getPathNameTitle = (obj: any[], target: string) => {
  let result: { base: { title: string; url: string } | null; children: { title: string; url: string }[] } = {
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


