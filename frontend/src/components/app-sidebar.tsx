import AddProperty from "@/components/AddProperty";
import CreateGroup from "@/components/CreateGroup";
import { NavGroup } from "@/components/nav-group";
import { NavIndividual } from "@/components/nav-individual";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useGroupContext } from "@/context/useGroupContext";
import { usePropertyContext } from "@/context/usePropertyContext";
import type { GroupListingItem, IdNameItem } from "@/lib/interfaces";
import { CircleDollarSign } from "lucide-react";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { getGroupsWithProperties } = useGroupContext();
  const { getIndividualProperties } = usePropertyContext();
  const [groups, setGroups] = useState<GroupListingItem[]>([]);
  const [properties, setProperties] = useState<IdNameItem[]>([]);
  const [GroupCreated, setGroupCreated] = useState(false);
  const [PropertyCreated, setPropertyCreated] = useState(false);

  useEffect(() => {
    getGroupsWithProperties().then((data) => setGroups(data));
    getIndividualProperties().then((data) => setProperties(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GroupCreated, PropertyCreated]);

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <CircleDollarSign className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Administración</span>
                  <span className="truncate text-xs">Alquileres</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="custom-sidebar">
        <NavGroup items={groups} />
        <NavIndividual items={properties} />
      </SidebarContent>
      <SidebarFooter>
        <AddProperty
          PropertyCreated={PropertyCreated}
          setPropertyCreated={setPropertyCreated}
        />
        <CreateGroup
          GroupCreated={GroupCreated}
          setGroupCreated={setGroupCreated}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
