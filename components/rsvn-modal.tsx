"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"

import { SetRsvn } from "@/action/set-rsvn"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormField, FormItem, FormMessage, FormControl } from "./ui/form"
import { Textarea } from "./ui/textarea"
import { Separator } from "./ui/separator"

type RsvnFormSchema = z.infer<typeof formSchema>

const formSchema = z.object({
  name: z.string().min(4),
  phone: z.string().min(11),
  email: z.string().min(5).email("Not a valid email"),
  message: z.string().optional(),
})


export function RsvnModal( data: { data:{price:number | null, pickupDate: Date | undefined, dropDate: Date | undefined } }) {
  const [isLoading, setIsLoading ] = useState(false)
  const [isPending, startTransition] = useTransition();
  const { price, pickupDate, dropDate } = data.data

  const onSubmit = (data:RsvnFormSchema )=>{
    try {
      startTransition(()=>{
        setIsLoading(true)
        console.log({...data,  price, pickupDate, dropDate } )
        SetRsvn(JSON.parse(JSON.stringify({...data,  price, pickupDate, dropDate })))
      })
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }

  }
  
  const form = useForm<RsvnFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    }
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button >Reserve</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Trip Information</DialogTitle>
          <DialogDescription>
            Kindly, complete below information
          </DialogDescription>
          <Separator></Separator>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
          <div className="flex-1 gap-2">
            <FormField 
              control={form.control}
              name="name"
              render={({field})=>(
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      id="name"
                      placeholder="Place your name"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex-1 gap-2">
            <FormField 
              control={form.control}
              name="phone"
              render={({field})=>(
                <FormItem>
                  <FormControl>
                  <Input
                    type="text"
                    id="phone"
                    placeholder="Mobile Number"
                    disabled={isLoading}
                    {...field}
                  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1 gap-2">
            <Label htmlFor="email" className="sr-only">
              Email 
            </Label>
            <FormField 
              control={form.control}
              name="email"
              render={({field})=>(
                <FormItem>
                  <FormControl>
                  <Input
                    type="email"
                    id="email"
                    placeholder="youremail@example.com"
                    disabled={isLoading}
                    {...field}
                  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
            <div className="flex-1 gap-2">
              <FormField 
                control={form.control}
                name="message"
                render={({field})=>(
                  <FormItem>
                    <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="e.q. special request, additional pickup point"
                      {...field}
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start my-4">
            <Button 
              disabled={isPending}
              type="submit">
              submit
            </Button>
          </DialogFooter>
         </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}