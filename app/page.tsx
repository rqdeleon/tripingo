"use client"
import { useState, useEffect } from "react";

import Testimony from "@/components/testimony";
import Contact from "@/components/contact";
import Reservation from "@/components/reservation";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)
 
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null;
  }

  return (

    <>
      <main className="flex flex-col items-center justify-between">
        
        <div id="rsvn1">
          <Reservation  />
        </div>
        <div className="w-full bg-teal-200/75">
          <Testimony />
        </div>
        <div id="contact1">
          <Contact />
        </div>
       
      </main>
    </>
  );
}
