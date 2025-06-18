import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
} from "@material-tailwind/react";
import { HomeIcon, BellIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { Crown } from "lucide-react";
 
export function TimelineWithIcon() {
  return (
    <div className="w-[22rem]">
      <Timeline>
        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader>
            <TimelineIcon className="p-2">
              <Crown className="h-4 w-4" color="#FFD700" />
            </TimelineIcon>
            <Typography variant="h7" color="blue-gray">
              Aang Anggriawan
            </Typography>
          </TimelineHeader>
          <TimelineBody className="pb-4">
            <Typography color="gary" className="font-xs text-gray-600">
              Informatika 2021
            </Typography>
          </TimelineBody>
        </TimelineItem>
        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader>
            <TimelineIcon className="p-2">
              <Crown color="#C0C0C0"  className="h-4 w-4" />
            </TimelineIcon>
            <Typography variant="h7" color="blue-gray">
             Tio
            </Typography>
          </TimelineHeader>
          <TimelineBody className="pb-4">
            <Typography color="gary" className="font-normal text-gray-600">
             Informatika 2022
            </Typography>
          </TimelineBody>
        </TimelineItem>
        <TimelineItem>
          <TimelineHeader>
            <TimelineIcon className="p-2">
              <Crown className="h-4 w-4" color="#CD7F32" />
            </TimelineIcon>
            <Typography variant="h7" color="blue-gray">
              Funny
            </Typography>
          </TimelineHeader>
          <TimelineBody>
            <Typography color="gary" className="font-normal text-gray-600">
              Informatika 2023
            </Typography>
          </TimelineBody>
        </TimelineItem>
      </Timeline>
    </div>
  );
}