"use client"

import { formatDistance } from "date-fns";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";

type DMDProps = {
  data:{
    distanceDisplay?: number,
    pickupDate: Date | undefined,
    dropDate: Date | undefined,
  }
}
export function DaysCalc(pickupDate:Date | undefined, dropDate:Date | undefined ){
  const diffDays = (dropDate != undefined && pickupDate != undefined) ? formatDistance(dropDate,pickupDate) : 0
  return diffDays;
}
export default function DistanceMatrixDetails( data:DMDProps ){

  const { distanceDisplay, pickupDate, dropDate } = data.data
  const diffDays = DaysCalc(pickupDate, dropDate)

  return(
    <section className="w-full border h-full bg-slate-400">
      <div className="gap-3 w-full border p-5">
      <h3 className="pb-2 text-center">Reservation Details</h3>
      <Separator></Separator>
      <div className="flex gap-4 justify-center items-center py-3">
        <Label>Estimated Travel Distance:</Label><span className="font-bold">{distanceDisplay + " km"}</span>
        <Label>Travel Duration by <dialog></dialog>day(s):</Label><span className="font-bold">{diffDays}</span>
      </div>
      </div>
    </section>
  );
}