
const business: any = [
  {
    title: "Overview",
    url: "/dashboard/overview/v1",
  },
  {
    title: "Workspace",
    url: "#",
    items: [
      {
        title: "Earnings",
        url: "/dashboard/earnings/v1",
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
        title: "Communications",
        url: "/dashboard/comms/v1",
      },
    ]
  },
  {
    title: "Analytics",
    url: "#",
    items: [
      {
        title: "Sales and Growth",
        url: "/dashboard/analytics/sales",
      },
      {
        title: "Customer Insights",
        url: "/dashboard/analytics/insights/v1",
      },
      {
        title: "Agents",
        url: "/dashboard/analytics/agents",
      },
      {
        title: "Product Performance",
        url: "/dashboard/analytics/products/v1",
      },
      {
        title: "Reports",
        url: "/dashboard/analytics/reports/v1",
      },
    ]
  },
  {
    title: "More",
    url: "#",
    items: [
      {
        title: "Notifications",
        url: "/dashboard/notifications",
      },
      {
        title: "Financials",
        url: "/dashboard/financials/v1",
      },
      {
        title: "Subscriptions",
        url: "/dashboard/subscriptions/v1",
      },
      {
        title: "Profile",
        url: "/dashboard/profile/v1",
      },
    ]
  },
  {
    title: "Help",
    url: "#",
    items: [
      {
        title: "Contact Support",
        url: "/dashboard/help/support/v1",
      },
      {
        title: "Guides",
        url: "/dashboard/help/guides/v1",
      },
      {
        title: "FAQs",
        url: "/dashboard/help/faqs/v1",
      },
    ]
  },
]

const agent: any = [
  {
    title: "Overview",
    url: "/dashboard/overview/v2",
  },
  {
    title: "Workspace",
    url: "#",
    items: [
      {
        title: "Earnings",
        url: "/dashboard/earnings/v2",
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
        url: "/dashboard/comms/v2",
      },
    ]
  },
  {
    title: "Analytics",
    url: "#",
    items: [
      {
        title: "Performance",
        url: "/dashboard/analytics/performance",
      },
      {
        title: "Customer Insights",
        url: "/dashboard/analytics/insights/v2",
      },
      {
        title: "Leads Insights",
        url: "/dashboard/analytics/leads",
      },
      {
        title: "Growth Metrics",
        url: "/dashboard/analytics/growth",
      },
      {
        title: "Reports",
        url: "/dashboard/analytics/reports/v2",
      },
    ]
  },
  {
    title: "More",
    url: "#",
    items: [
      {
        title: "Notifications",
        url: "/dashboard/notifications",
      },
      {
        title: "Financials",
        url: "/dashboard/financials/v2",
      },
      {
        title: "Subscriptions",
        url: "/dashboard/subscriptions/v2",
      },
      {
        title: "Profile",
        url: "/dashboard/profile/v2",
      },
    ]
  },
  {
    title: "Help",
    url: "#",
    items: [
      {
        title: "Contact Support",
        url: "/dashboard/support/v2",
      },
      {
        title: "Guides",
        url: "/dashboard/guides/v2",
      },
      {
        title: "FAQs",
        url: "/dashboard/faqs/v2",
      },
    ]
  },
]



export const getLinks = (mode: "agent" | "business") => {
  return mode === "agent" ? agent : business;
};



const getPathNameTitle = (obj: any[], target: string) => {
  let result: { base: { title: string; url: string } | null; children: { title: string; url: string }[] } = {
    base: null, // Initialize base as null
    children: [],
  };

  for (const section of obj) {
    if (section.url === target) {
      result.base = { title: section.title, url: section.url };
      console.log(result)
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


