"use client";
import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { IdNameItem } from "@/lib/interfaces";
import { useNavigate } from "react-router-dom";

export function NavGroup({ items }: { items: IdNameItem[] }) {
  const navigate = useNavigate();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Grupos</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.id}
            asChild
            defaultOpen={true}
            className="cursor-pointer rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={() => navigate(`/group/${item.id}`)}
          >
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.name}>
                <span className="text-sm p-2">{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
