import { HiOutlineBolt } from "react-icons/hi2";
import { IoLocationOutline, IoStar } from "react-icons/io5";
import SeButton from "../button/SeButton";
import { GoLock } from "react-icons/go";

const cardPros = [
  { id: 1, name: "Ramesh K.", rating: 4.9, distance: "0.8" },
  { id: 2, name: "Sunil M.", rating: 4.7, distance: "1.4" },
  { id: 3, name: "Dipak B.", rating: 4.8, distance: "1.9" },
];

const HeroBannerCard = () => {
  return (
    <div className='bg-card-bg rounded-lg p-6 grid gap-2 w-full max-w-sm'>
      {/* type and difficulty */}
      <div className='flex items-center justify-between text-xs'>
        <div className='py-1 px-3 rounded-full border border-muted/20'>
          Plumbing
        </div>
        <div className='flex items-center gap-2 rounded-full py-1 px-3 bg-amber-50 text-amber-600'>
          <HiOutlineBolt className='stroke-amber-600' />
          <span>Medium Job</span>
        </div>
      </div>

      {/* description */}
      <h3 className='text-text-dark font-bold'>Kitchen pipe leak + tap fix</h3>

      {/* location */}
      <p className='text-xs flex items-center gap-1 text-muted'>
        <IoLocationOutline /> <span>Lalitpur · 1.2 km away</span>
      </p>

      {/* ai decision */}
      <div className='flex items-center bg-bg rounded-xl gap-2 p-3'>
        <div className='bg-primary w-9 h-9 flex items-center justify-center rounded-full'>
          <HiOutlineBolt className='stroke-light' />
        </div>
        <div className='flex flex-col'>
          <p className='text-small font-semibold text-muted/70'>
            AI Adjudication
          </p>
          <p className='text-sm font-bold text-primary'>
            Est. Rs. 1,200 – 2,800
          </p>
        </div>
      </div>

      {/* match */}
      <div className=''>
        {/* match heading */}
        <div className='font-semibold flex items-center justify-between'>
          <p className='text-small text-muted uppercase'>MATCHED PROS</p>
          <p className='text-xs text-accent'>Rule of 3</p>
        </div>
        {/* match pros */}
        <div className='grid gap-2'>
          {cardPros.map((pro) => (
            <div
              key={pro.id}
              className='flex items-center justify-between text-primary border border-bg px-4 py-2.5 rounded-lg'
            >
              <p className='font-medium text-sm'>{pro.name}</p>
              <div className='flex items-center gap-3 text-xs text-muted'>
                <p className='flex items-center gap-1 flex-2'>
                  <IoStar className='fill-amber-500' />
                  {pro.rating}
                </p>
                <p className='flex-1'>{pro.distance}km</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* button */}
      <SeButton
        btnText='Unlock Lead · Rs. 150'
        variant='accentLight'
        icon={<GoLock />}
      />
    </div>
  );
};

export default HeroBannerCard;
