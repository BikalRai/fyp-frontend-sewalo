export const authKeys = {
  all: () => ["auth"] as const,
  currentUser: () => ["auth", "me"] as const,
};

export const userKeys = {
  all: () => ["user"] as const,
  me: () => ["user", "me"] as const,
};
