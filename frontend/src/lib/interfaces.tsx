export interface IdNameItem {
  id: number;
  name: string;
}

export interface PropertyDTO {
  id: number;
  name: string;
  description: string | null;
  type: string;
  groupId: number | null;
}

export interface GroupDTO {
  id: number;
  name: string;
  description: string | null;
  properties?: PropertyDTO[];
}

export interface GroupListingItem {
  id: number;
  name: string;
  properties?: IdNameItem[];
}

export interface RecordDTO {
  id?: number;
  propertyId: number;
  propertyName: string;
  groupId: number | null;
  groupName: string | null;
  month: number;
  year: number;
  income: number;
  netIncome: number;
  expenses: ExpenseDTO[];
  totalExpenses?: number;
}

export interface ExpenseDTO {
  id: number;
  recordId: number;
  title: string;
  description: string;
  amount: number;
  share?: number;
}

export interface CreateRecordDTO {
  propertyId: number;
  month: number;
  year: number;
  income: number;
  expenses: CreateExpenseDTO[];
}

export interface CreateExpenseDTO {
  title: string;
  description: string;
  amount: number;
  share?: number;
}