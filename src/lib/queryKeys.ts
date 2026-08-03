export const authKeys = {
  all: () => ["auth"] as const,
  currentUser: () => ["auth", "me"] as const,
};

export const userKeys = {
  all: () => ["user"] as const,
  me: () => ["user", "me"] as const,
};

export const providerKeys = {
  all: () => ["provider"] as const,
  me: () => ["provider", "me"] as const,
  details: (id: string) => ["provider", id, "details"] as const,
};

export const customerKeys = {
  all: () => ["customer"] as const,
  me: () => ["customer", "me"] as const,
  history: (id: string) => ["customer", id, "history"] as const,
};

export const categorykeys = {
  all: ["categories"] as const,
};

export const jobKeys = {
  // the base key (invalidating this nukes everything related to jobs)
  all: ["jobs"] as const,

  adminAll: () => [...jobKeys.lists(), "admin"] as const,

  // lists
  lists: () => [...jobKeys.all, "list"] as const,

  // specific list
  customerHistory: () => [...jobKeys.lists(), "customer"] as const,

  // provider feed
  providerFeed: () => [...jobKeys.lists(), "open"] as const,

  // details
  details: () => [...jobKeys.all, "detail"] as const,

  detail: (jobId: string) => [...jobKeys.details(), jobId] as const,

  stats: () => [...jobKeys.all, "stats"] as const,
};

export const bidKeys = {
  all: ["bids"] as const,

  jobBids: (jobId: string) => ["bids", "job", jobId] as const,
};

export const notificationKeys = {
  all: ["notifications"] as const,
  recent: () => [...notificationKeys.all, "recent"] as const,
  unreadCount: () => [...notificationKeys.all, "unread-count"] as const,
};

export const billingKeys = {
  // Base scope for all billing-related queries
  all: ["billing"] as const,

  // Specific key for the provider's credit balance
  // Used in: useQuery({ queryKey: billingKeys.credits() })
  credits: () => [...billingKeys.all, "credits"] as const,

  // Specific key for tracking a payment verification attempt (if needed as a query)
  // Used in: useMutation (or useQuery if polling) to tie the pidx to the cache
  verification: (pidx: string) => [...billingKeys.all, "verify", pidx] as const,
};

export const adminKeys = {
  all: ["admin"] as const,
  pendingProviders: () => [...adminKeys.all, "pending-providers"] as const,
  liquidityStats: () => [...adminKeys.all, "liquidity-stats"] as const,
  jobs: () => [...adminKeys.all, "jobs"] as const,
  providers: () => [...adminKeys.all, "providers"] as const,
  transactions: () => [...adminKeys.all, "transactions"] as const,
  revenueSummary: () => [...adminKeys.all, "revenue-summary"] as const,
};

export const chatKeys = {
  all: ["chat"] as const,
  jobChat: (jobId: string) => [...chatKeys.all, "job", jobId] as const,
  // Add this if we do the sidebar later
  conversations: () => [...chatKeys.all, "conversations"] as const,
};
