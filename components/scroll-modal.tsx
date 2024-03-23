"use client"
import { useEffect, useState } from "react";
import axios from "axios";

import { Input } from "./ui/input"
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog" 


export default function ScrollModal(){

  const [endScroll, setEndScroll] = useState(false)
  const [viewed, setViewed] = useState(false)
  const [subsEmail, setSubsEmail] = useState('')

  const onViewed = ()=>{
    setEndScroll(false)
    setViewed(true)
  }

  const handleScroll = () => {
    const scrollableHeight = window.document.documentElement.scrollHeight - window.innerHeight
    
    if(window.scrollY >= scrollableHeight && viewed === false){
      setEndScroll(true);
    } else {
      setEndScroll(false); 
    }
  }

  useEffect(()=>{
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  })


  return (
    <>  
      <Dialog open={endScroll} onOpenChange={(onViewed)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subscribe email and receive free ebooks</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 item-center gap-4">
              <label htmlFor="email">Email</label>
              <Input 
                required 
                name="email" 
                type="email" 
                value={subsEmail}
                onChange={(e)=>setSubsEmail(e.target.value)}
                className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={async ()=>{ 
            if(subsEmail){
              try {
                console.log(subsEmail)
                await axios.post('api/mail/', {email: subsEmail, message: "New Email Subscription"} )
              } catch (error) {
                console.log(error)
              }
              onViewed()
            }else{
              onViewed()
            }
            }}>
              Subscribe
          </Button>
        </DialogFooter>
      </DialogContent>
      </Dialog>
    </>
  );
}