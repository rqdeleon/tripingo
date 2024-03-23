"use client"

import { useState, useEffect, cache } from "react"
import { format } from "date-fns"
import dayjs from 'dayjs';
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"


import { cn } from "@/lib/utils"
import VehicleList from "@/components/vehiclesList";
import { SortedLocation } from "@/action/get-cities";
import { GetDistance } from "@/action/get-distance";
import { Calendar as CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import DistanceMatrixDetails from "@/components/distancematrix-data";

type LocalRsvnProps = {
  pickupLocation: string,
  pickupDate: Date,
  pickupTime: string,
  dropLocation: string,
  dropDate: Date,
  dropTime: string,
  returnLoc: boolean,
}

export default function Reservation(){

  const [ isLoading, setIsloading] = useState(false);
  const [ isReturnLoc, setReturnLoc] = useState(true);
  const [ pickupDate, setPickupDate] = useState<Date>();
  const [ pickupLoc, setPickupLoc] = useState('');
  const [ pickupTime, setPickupTime] = useState<dayjs.Dayjs | null>()
  const [ dropDate, setDropDate] = useState<Date>();
  const [ dropLoc, setDropLoc] = useState('');
  const [ dropTime, setDropTime] = useState<dayjs.Dayjs | null>();
  const [ distanceValue, setDistanceValue ] = useState(0);

  const [ cOpen1, setCopen1 ] = useState(false);
  const [ cOpen2, setCopen2 ] = useState(false);
  const [ locations, setLocations] = useState<string[]>([''])

  useEffect(()=>{
    setIsloading(true)
    const fetchLocation = cache(async () => {
      const locs = await SortedLocation()
      setLocations(locs);
      setIsloading(false)
    })

    fetchLocation()

    if (typeof window !== "undefined" && window.localStorage) {
      if(localStorage.getItem("reservationData")?.length == 0 || localStorage.getItem("reservationData")?.length == undefined){
        localStorage.setItem("reservationData", 
        JSON.stringify({
          pickupLocation: pickupLoc,
          pickupDate: pickupDate,
          pickupTime: pickupTime,
          dropLocation: dropLoc,
          dropDate: dropDate,
          dropTime: dropTime,
          returnLoc: isReturnLoc,
        }))
      }else{
        const data:LocalRsvnProps= JSON.parse(localStorage.getItem("reservationData") as string)
        const { pickupLocation, pickupDate, pickupTime, dropLocation, dropDate, dropTime,returnLoc } = data
        setPickupLoc(pickupLocation);
        setPickupDate(pickupDate);
        setPickupTime(dayjs(pickupTime));
        setDropLoc(dropLocation);
        setDropDate(dropDate);
        setDropTime(dayjs(dropTime));
        setReturnLoc(returnLoc);
      }
    }
  },[]);

  const handleSubmit = async () =>{
    if(pickupLoc != "" && dropLoc !="" && pickupDate != undefined &&  pickupTime != null && dropDate != undefined ){
      try {
        setIsloading(true);
        const data = { 'pickupAddress': pickupLoc, 'dropoffAddress': dropLoc};
        const distanceData = await GetDistance(data)
        setDistanceValue(distanceData ? distanceData : 0)
        localStorage.setItem("reservationData", 
          JSON.stringify({
            pickupLocation: pickupLoc,
            pickupDate: pickupDate,
            pickupTime: pickupTime,
            dropLocation: dropLoc,
            dropDate: dropDate,
            dropTime: dropTime,
            returnLoc: isReturnLoc,
          }) 
        )
      } catch (error) {
        console.log(error)
      }finally{setIsloading(false)}
  }
}

const distanceDisplay = isReturnLoc ? (distanceValue? distanceValue * 2 : 1) : (distanceValue? distanceValue : 1)
  
return(
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <section className="w-full bg-gray-600">
        <div className="flex py-10 items-center justify-center bg-fixed w-full h-full bg-contain bg-no-repeat bg-center" style={{backgroundImage: 'url("/images/reservation/rsvn-banner.png")'}}>
            <div className="flex-col gap-4 px-2 bg-white md:grid md:grid-cols-2 py-7">
              <div className="flex flex-col gap-5 items-center justify-start">
                <Label>1. Select Pickup & Dropoff Location</Label>
                <div>
                  <Label className="block text-[12px] text-gray-500">pick-up city</Label>
                  <Popover  open={cOpen1} onOpenChange={setCopen1}>
                    <PopoverTrigger asChild>
                      <Button
                        disabled={isLoading}
                        variant="outline"
                        role="combobox"
                        aria-expanded={cOpen1}
                        className="w-[280px] justify-start text-left font-normal"
                        onClick={async ()=>{
                          setIsloading(true)
                          const locs = await SortedLocation()
                          setLocations(locs)
                          setIsloading(false)
                        }}
                      >
                        {pickupLoc ? locations.find((s) => s === pickupLoc) : "Select Pick-up Location"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[280px] p-0">
                      <Command>
                        <CommandInput placeholder="Search location..." className="h-9" />
                        <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                              {locations.map((loc) => (
                                <CommandItem
                                  
                                  key={loc}
                                  value={loc.toString()}
                                  onSelect={
                                    (currentValue) => {
                                      setPickupLoc(currentValue === pickupLoc ? pickupLoc : currentValue)
                                      setCopen1(false)
                                    }
                                  }
                                >
                                  {loc}
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      pickupLoc === loc ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="dropoffloc" className="block text-[12px] text-gray-500">drop-off city</Label>
                  <Popover  open={cOpen2} onOpenChange={setCopen2}>
                    <PopoverTrigger asChild>
                      <Button
                        disabled={isLoading}
                        variant="outline"
                        role="combobox"
                        aria-expanded={cOpen2}
                        className="w-[280px] justify-start text-left font-normal"
                      >
                        {dropLoc ? locations.find((s) => s === dropLoc) : "Select drop-off location"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[280px] p-0">
                      <Command>
                        <CommandInput placeholder="Search location..." className="h-9" />
                        <CommandList>
                        <CommandEmpty>No location found.</CommandEmpty>
                          <CommandGroup>
                              {locations.map((loc) => (
                                <CommandItem
                                  key={loc}
                                  value={loc.toString()}
                                  onSelect={
                                    (currentValue) => {
                                      setDropLoc(currentValue === dropLoc ? dropLoc : currentValue)
                                      setCopen2(false)
                                    }
                                  }
                                >
                                  {loc}
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      dropLoc === loc ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex items-center justify- gap-4 pr-5">
                  <Switch 
                    id="returnsame" 
                    checked={isReturnLoc}
                    onCheckedChange={setReturnLoc}
                    disabled={isLoading}
                  />
                  <Label htmlFor="returnsame" className="text-foreground/75">Return on pick-up location</Label>
                </div>
              </div>

              <div className="flex flex-col gap-5 mt-7 items-center justify-center mr-7 md:mt-0">
              <Label>2. Itinerary</Label>
              <div className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="pickupdate" className="text-[12px] text-gray-500">pick-up date</Label>
                  <div id="pickupdate">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          disabled={isLoading}
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !pickupDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {pickupDate ? format(pickupDate, "PPP") : <span>Pick-up date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={pickupDate}
                          onSelect={setPickupDate}
                          disabled={isLoading}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div>
                  <Label className="text-[12px] text-gray-500">pick-up time</Label>
                  <DemoContainer 
                    components={['MobileTimePicker']}>
                  <MobileTimePicker 
                    value={dayjs(pickupTime)} 
                    onChange={(newVal) => setPickupTime(newVal)} 
                    defaultValue={dayjs('2022-04-17T15:30')} 
                    disabled={isLoading}
                  />
                  </DemoContainer>
                </div>
              </div>
              <Separator ></Separator>
              <div className="flex flex-col gap-4">
                <div>
                <Label htmlFor="pickupdate" className="text-[12px] text-gray-500">drop-off date</Label>
                  <div id="pickupdate">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          disabled={isLoading}
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !dropDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dropDate ? format(dropDate, "PPP") : <span>Drop-off date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dropDate}
                          onSelect={setDropDate}
                          initialFocus
                          disabled={isLoading}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div>
                  <Label className="text-[12px] text-gray-500">drop-off time</Label>
                  <DemoContainer components={['MobileTimePicker']} >
                    <MobileTimePicker disabled={isLoading} value={dayjs(dropTime)} onChange={(newVal) => setDropTime(newVal)}defaultValue={dayjs('2022-04-17T15:30')} />
                  </DemoContainer>
                </div>
              </div>
            </div>
            <div className="col-span-2 px-8 mt-3">
              <Button type="submit" disabled={isLoading} onClick={handleSubmit} className="w-full">Search</Button>
            </div>
          </div>
        </div>
        <DistanceMatrixDetails data={{distanceDisplay, pickupDate, dropDate}} />
      </section>

      </LocalizationProvider>
      <VehicleList data={{distanceValue, pickupDate, dropDate, isReturn:isReturnLoc} }/>
    </>
  );
}