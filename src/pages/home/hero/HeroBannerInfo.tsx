import { GoLock } from "react-icons/go";
import { IoMdTime } from "react-icons/io";
import { IoStarOutline } from "react-icons/io5";

const infoDetails = [
  { id: 1, name: "Verified pros", icon: <IoStarOutline />, detail: "480+" },
  { id: 2, name: "Avg. response", icon: <IoMdTime />, detail: "<8m" },
  { id: 3, name: "Jobs done", icon: <GoLock />, detail: "2.4k+" },
];

const HeroBannerInfo = () => {
  return (
    <div className='grid grid-cols-3 gap-3 w-full max-w-sm'>
      {infoDetails.map((info) => (
        <div
          key={info.id}
          className='p-3 flex flex-col items-center gap-3 text-xs rounded-lg bg-light/10 text-muted'
        >
          <div className='text-base'>{info.icon}</div>
          <h3 className='text-light font-semibold'>{info.detail}</h3>
          <p>{info.name}</p>
        </div>
      ))}
    </div>
  );
};

export default HeroBannerInfo;
