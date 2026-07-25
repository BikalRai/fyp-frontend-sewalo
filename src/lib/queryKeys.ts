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

  // lists
  lists: () => [...jobKeys.all, "list"] as const,

  // specific list
  customerHistory: () => [...jobKeys.lists(), "customer"] as const,

  // provider feed
  providerFeed: () => [...jobKeys.lists(), "open"] as const,

  // details
  details: () => [...jobKeys.all, "detail"] as const,

  detail: (jobId: string) => [...jobKeys.details(), jobId] as const,
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
