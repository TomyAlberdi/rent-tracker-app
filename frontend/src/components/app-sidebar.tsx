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
import type { GroupListingItem, IdNameItem } from "@/lib/interfaces";
import { CircleDollarSign } from "lucide-react";
import * as React from "react";
import { Link } from "react-router-dom";

const individual_properties: IdNameItem[] = [
  {
    id: 1,
    name: "El Talar",
  },
  {
    id: 2,
    name: "Amondarain",
  },
];

const groups: GroupListingItem[] = [
  {
    id: 1,
    name: "Magdalena",
    description: "Una propiedad de la zona de Magdalena",
    properties: [
      {
        id: 3,
        name: "Dto. A",
        description: null,
        type: "GROUPED",
        groupId: 1,
      },
      {
        id: 4,
        name: "Dto. B",
        description: null,
        type: "GROUPED",
        groupId: 1,
      },
      {
        id: 5,
        name: "Dto. C",
        description: null,
        type: "GROUPED",
        groupId: 1,
      },
    ],
  },
  {
    id: 2,
    name: "Edificio 51",
    description: "Una propiedad de La Plata",
    properties: [
      {
        id: 6,
        name: "Dto. A",
        description: null,
        type: "GROUPED",
        groupId: 2,
      },
      {
        id: 7,
        name: "Dto. B",
        description: null,
        type: "GROUPED",
        groupId: 2,
      },
      {
        id: 8,
        name: "Dto. C",
        description: null,
        type: "GROUPED",
        groupId: 2,
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <NavIndividual items={individual_properties} />
      </SidebarContent>
      <SidebarFooter>
        <AddProperty />
        <CreateGroup />
      </SidebarFooter>
    </Sidebar>
  );
}
