"use client"
import Link from 'next/link'

import { useMediaQuery } from '@/hooks/use-media-query'
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer'
import { MenuIcon } from 'lucide-react'

export default function MainNav(){

  const isDesktop = useMediaQuery("(min-width:850px)")
  const navigation = [
    { name: "Reserve Your Trip", href: "#rsvn1" },
    { name: "Testimonies", href: "#testi1" },
    { name: "Contact", href: "#contact1" },
  ];

  return(
    <header
      className="flex w-full items-center bg-white dark:bg-dark"
    >
    <div className="container mx-auto">
      <div className="relative -mx-4 flex items-center justify-between">
        <div className="w-60 max-w-full px-4">
        <h2 className="text-lg font-bold hover:text-foreground/75">
          <Link href="/" className="block w-full py-5">
              TripinGo
          </Link>
        </h2>
        </div>
        <div className="flex justify-end items-center w-full  px-4">
          <div>
            <nav
              id="navbarCollapse"
              className="flex w-full bg-white px-6 py-5 dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent"
            >
        { isDesktop ?
          <ul className="flex space-x-5">
            { navigation.map((item)=>(
                <Link 
                  key={item.name}
                  href={item.href}
                  className="flex py-2 text-base font-medium text-body-color hover:text-dark dark:text-dark-6 dark:hover:text-white lg:ml-12 lg:inline-flex"
                >{item.name}
                </Link>
              ))}
            </ul>   
          :
          <Drawer direction="left">
            <DrawerTrigger>
              <MenuIcon className="dark:text-white" />
            </DrawerTrigger>
            <DrawerContent >
                <nav> 
                  <ul className="flex flex-col pt-10">   
                    {
                      navigation.map((item)=>(
                        <Link 
                          key={item.name}
                          href={item.href}
                          className="flex px-2 py-2 text-base font-medium text-body-color hover:text-dark hover:bg-secondary dark:text-dark-6 dark:hover:text-white lg:ml-12 lg:inline-flex"
                        >{item.name}
                        </Link>
                      ))
                    }
                  </ul>
                </nav>
            </DrawerContent>
          </Drawer>  
        }
        
            </nav>
          </div>
        </div>
      </div>
    </div>
  </header>
  )
}