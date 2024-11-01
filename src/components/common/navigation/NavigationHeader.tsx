"use client"
 
import * as React from "react"
 
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import ModeToggle from "@/components/common/toggle/ModeToggle"
import { supabase } from "@/utils/supabase";
import { useEffect,useState } from "react"
import Image from "next/image";
 
export default function NavigationMenuDemo() {

  const [moosu, setMoosu] = useState<any>([]);
  const [moomem, setMoomem] = useState<any>([]);
  const [moobilling, setMoobilling] = useState<any>([]);

  const getStreamerData = async (position: string, setState: React.Dispatch<React.SetStateAction<any>>) => {
    let { data, error } = await supabase
      .from("streamer")
      .select("*")
      .eq("position", position);

    if (error) {
      console.log(`Error fetching ${position} data:`, error);
    } else {
      setState(data);
    }
  };

  useEffect(() => {
    getStreamerData("무수", setMoosu);
    getStreamerData("무멤", setMoomem);
    getStreamerData("무과금", setMoobilling);
  }, []);

  return (
  <header className="flex justify-between gap-4 border-b bg-background px-4 md:px-6 h-16 top-0">
    <div className="flex items-center">
    <a href="/">
    <Image src="/images/mooboxBlack.png" alt="로고" width={50} height={50}></Image>
    </a>
    </div>
    <div className="flex-1 flex justify-center">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>무수</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              {moosu && moosu.map((item:any) => {
                return (
                  <ListItem href={`/streamer/${item.id}`} title={item.name} key={item.no}>
                  ({item.id})
                  </ListItem>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>무과금(임시)</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {moobilling && moobilling.map((item:any)=> {
                return (
                  <ListItem href={`/streamer/${item.id}`} title={item.name} key={item.no}>
                  ({item.id})
                  </ListItem>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>무멤</NavigationMenuTrigger>
          <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {moomem && moomem.map((item:any)=> {
                return (
                  <ListItem href={`/streamer/${item.id}`} title={item.name} key={item.no}>
                  ({item.id})
                  </ListItem>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <ModeToggle/>
      </NavigationMenuList>
    </NavigationMenu>
    </div>
  </header>
  )
}
 
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"