"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/NavigationMenu";
import { Facebook } from "lucide-react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Posts overview",
    href: "/dashboard/posts",
    description: "All posts in grid",
  },
  {
    title: "Create post",
    href: "/dashboard/posts/create",
    description: "Creating blog post",
  },
  {
    title: "Edit post",
    href: "/dashboard/create",
    description: "Choose a post and edit",
  },
];

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Dashboard</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <span className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-black/50 to-gray-400 p-6 no-underline outline-none focus:shadow-md">
                    <Facebook className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">Socials</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Tempora enim ducimus reprehenderit non eos nam nesciunt
                      soluta saepe.
                    </p>
                  </span>
                </NavigationMenuLink>
              </li>
              <ListItem href="/dashboard#my-statistics" title="My statistics">
                Your statistics based on your created posts.
              </ListItem>
              <ListItem
                href="/dashboard#blog-statistics"
                title="Blog statistics"
              >
                All metrics. Statistics based on blogs, views, etc...
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Posts</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/dashboard/category" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Category
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 hover:dark:bg-slate-800 focus:bg-slate-200",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
