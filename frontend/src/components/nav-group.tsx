"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import type { GroupListingItem } from "@/lib/interfaces";
import { Link } from "react-router-dom";

export function NavGroup({ items }: { items: GroupListingItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Grupos</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.id} asChild defaultOpen={true}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.name}>
                <Link to={`/group/${item.id}`}>
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
              {item.properties?.length ? (
                <>
                  <CollapsibleTrigger asChild className="cursor-pointer">
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.properties?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.id}>
                          <SidebarMenuSubButton asChild>
                            <Link to="/">
                              <span>{subItem.name}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
