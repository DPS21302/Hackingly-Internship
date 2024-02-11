import { Button } from "@nextui-org/react";
import { MapPin, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDate, formatTime } from "@/utils/formateDate";
const OppCard = (props) => {
  const {OpportunityName,OpportunityMode,opportunityCoverImg , OpportunityLink,startDate, time} = props;
  return (
    <div className="block rounded-xl p-4 border  shadow-md shadow-gray-300 w-[450px] h-full">
    <div className="w-full h-[200px] relative items-center justify-center flex">
      <Image
        alt="Home"
        src={opportunityCoverImg}
        loading="lazy"
        srcSet={opportunityCoverImg}
        className="rounded-md w-1/2 justify-self-center"
        layout="fill"
      />
    </div>

    <div className="my-2">
      <h4 className="font-medium text-base mt-3">{OpportunityName}</h4>
      <div className="mt-6 flex items-center gap-8 text-xs">
        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
          <Calendar size={20} className="text-primary" />

          <div className="mt-1.5 sm:mt-0">
            <p className="text-gray-500">Event Date</p>

            <p className="font-semibold text-base">{startDate.length > 0 ? startDate : formatDate(startDate)}</p>
          </div>
        </div>
        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
          <Clock size={20} className="text-primary" />

          <div className="mt-1.5 sm:mt-0">
            <p className="text-gray-500">Time</p>

            <p className="font-semibold text-base">{time.length > 0 ? time : formatTime(time)}</p>
          </div>
        </div>
        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
          <MapPin size={20} className="text-primary" />

          <div className="mt-1.5 sm:mt-0">
            <p className="text-gray-500">Mode</p>

            <p className="font-semibold text-base">{OpportunityMode}</p>
          </div>
        </div>
      </div>
    </div>
    <div className="">
      <Button
        color="primary"
        as={Link}
        href={OpportunityLink}
        passHref
        size="sm"
        className="w-full"
      >
        Register
      </Button>
    </div>
  </div>
);
}
export default OppCard;


// OpportunityCard.propTypes = {
// opportunityCoverImg: PropTypes.string.isRequired,
// OpportunityName: PropTypes.string.isRequired,
// OpportunityMode: PropTypes.string.isRequired,
// startDate: PropTypes.string.isRequired,
// time: PropTypes.string.isRequired,
// OpportunityLink: PropTypes.string.isRequired,
// };

