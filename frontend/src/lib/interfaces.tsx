export interface IdNameItem {
  id: number;
  name: string
}

export interface PropertyDTO {
  id: number;
  name: string;
  description: string | null;
  type: string;
  groupId: number | null;
}

export interface GroupListingItem {
  id: number;
  name: string;
  description: string | null;
  properties?: PropertyDTO[];
}