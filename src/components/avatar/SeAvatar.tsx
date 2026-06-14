import type { UserResponseType } from "@/types/user.types";

const SeAvatar = ({ user }: UserResponseType) => {
  return (
    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-accent/10 transition-colors duration-200 hover:bg-accent/20 cursor-pointer">
      {user ? (
        <div className="text-accent">A</div>
      ) : (
        <img src="" alt="User avatar" />
      )}
    </div>
  );
};

export default SeAvatar;
