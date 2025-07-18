import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { IdNameItem } from "@/lib/interfaces";
import { Link } from "react-router-dom";

export function NavIndividual({ items }: { items: IdNameItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Otras Propiedades</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild tooltip={item.name}>
              <Link to="/">
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
