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
