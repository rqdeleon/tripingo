"use client"

import { formatDistance } from "date-fns";
import { Button } from "@/components/ui/button"
import { Armchair, AirVent, ShieldCheck } from "lucide-react"
import { RsvnModal } from "./rsvn-modal";

type VehicleProp = {
  data: {
    distanceValue : number,
    pickupDate: Date | undefined,
    dropDate: Date | undefined,
    isReturn: boolean,
  }
}

export function PriceCalc( price:number, distance:number, days:number, isReturn:boolean){
  let rental = 0
  if(days <= 1 && distance <= 25 ){
    isReturn ? rental = price - (price * 0.25) * 1.5 : rental = price - (price * 0.25)
  }else if( days >= 1 && distance > 1 && distance <= 24){
    isReturn ? rental = (price * days)  : rental = (price * days) 
  }else if( days >= 1 && distance > 25 && distance <= 199){
    isReturn ? rental = (price * days) + (distance / 5 * 100) * 1.5 : rental = (price * days) + (distance / 5 * 100)
  }else if( days >= 2 && distance >= 200 && distance <= 549){
    isReturn ? rental = price * days + (distance / 5 * 170) * 1.5 : rental = price * days + (distance / 5 * 170)
  }else if( days == 1 && distance >= 300 || distance >= 550 ){
    return null
  }
  return rental
}

export function DaysCalc(pickupDate:Date | undefined, dropDate:Date | undefined){
  const diffDays = (dropDate != undefined && pickupDate != undefined) ? formatDistance(dropDate,pickupDate) : "0"
  return diffDays
}

export default function VehicleList(data:VehicleProp){

  const { distanceValue, pickupDate, dropDate, isReturn } = data.data
  const travelDays = DaysCalc(pickupDate, dropDate)
  const pricing= PriceCalc(7000,distanceValue, parseInt(travelDays, 10), isReturn)
  
  const vehicles = [
    {
      model: 'Hiace Commuter',
      year: '2023',
      rent: 7000,
      image: '/images/vehicle/hiace.bmp'
    }
  ]

  return(
    <>
    <div className="relative bg-white pb-[110px] pt-[120px] dark:bg-dark lg:pt-[150px]">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div id="vehicle-image"  className="w-full px-4 md:w-6/12">
            <div className="lg:ml-auto lg:text-right">
              <div className="relative z-10 inline-block pt-5 lg:pt-0">
                <img
                  src="/images/vehicle/hiace.bmp"
                  alt="vehicle"
                  className="max-w-full"
                />
              </div>
            </div>
          </div>
          <div className="hidden px-4 lg:block lg:w-1/12"></div>
          <div className="hero-content">
              <h3 className="mb-5 text-4xl font-bold !leading-[1.208] text-dark dark:text-white sm:text-[42px] lg:text-[40px] xl:text-5xl" >
                Hiace Van
              </h3>
              <p
                className="mb-8 max-w-[480px] text-base text-body-color dark:text-dark-6"
              >
                With TailGrids, business and students thrive together. Business
                can perfectly match their staffing to changing demand throughout
                the dayed.
              </p>
              <span>PHP {pricing}</span>
              <ul className="flex flex-wrap items-center gap-4 mt-2">
                <li>
                  <RsvnModal data={{price:pricing, pickupDate, dropDate}} />
                </li>
                <li>
                  <Button variant="outline"> Pay now </Button>
                </li>
              </ul>
              <div className="clients pt-16">
                <div className="flex items-center gap-4 xl:gap-[50px]">
                  <span className="flex gap-2 py-2 text-gray-500 text-sm"><Armchair /> 15 PAX</span>
                  <span className="flex gap-2 py-2 text-gray-500 text-sm"><AirVent />Dual AC</span>
                  <span className="flex gap-2 py-2 text-gray-500 text-sm"><ShieldCheck />Insurance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}