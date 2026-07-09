export const getDifficultyStyles = (difficulty: string) => {
  switch (difficulty) {
    case "LOW":
      return "bg-green-50 text-green-600";
    case "MEDIUM":
      return "bg-yellow-50 text-yellow-600";
    case "HIGH":
      return "bg-red-50 text-red-600";
    default:
      return "bg-gray-50 text-gray-600";
  }
};

export const getUrgencyStyles = (urgency: string) => {
  switch (urgency) {
    case "EMERGENCY":
      return "bg-red-50 text-red-600";
    default:
      return "bg-amber-50 text-amber-600"; // PLANNING etc
  }
};

// 2. Helper function to format the ISO string into a clean "2h ago" or "Just now" format
export const formatTimeAgo = (dateString: string | null) => {
  if (!dateString) return "Just now";

  const seconds = Math.round(
    (new Date().getTime() - new Date(dateString).getTime()) / 1000,
  );
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};
