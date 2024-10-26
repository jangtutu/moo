"use client"
 
import * as React from "react"
import Link from "next/link"
 
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
 
export default function NavigationMenuDemo() {

  const [moosu, setMoosu] = useState<any>([]);
  const [moomem, setMoomem] = useState<any>([]);

  const getStreamerData = async (position: string, setState: React.Dispatch<React.SetStateAction<any>>) => {
    let { data, error } = await supabase
      .from("streamer")
      .select("*")
      .eq("position", position);

    if (error) {
      console.log(`Error fetching ${position} data:`, error);
    } else {
      console.log(`Fetched ${position} data:`, data);
      setState(data);
    }
  };

  useEffect(() => {
    getStreamerData("무수", setMoosu);
    getStreamerData("무멤", setMoomem);
  }, []);

  return (
  <header className="flex justify-center gap-4 border-b bg-background px-4 md:px-6 h-16 top-0">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>무수</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              {moosu && moosu.map((item:any) => {
                return (
                  <ListItem href={`/streamer/${item.id}`} title={item.name}>
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
                  <ListItem href={`/streamer/${item.id}`} title={item.name}>
                  ({item.id})
                  </ListItem>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>코창서버</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <ModeToggle/>
      </NavigationMenuList>
    </NavigationMenu>
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