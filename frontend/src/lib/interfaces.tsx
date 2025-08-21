export interface IdNameItem {
  id: string;
  name: string;
}

export interface Property {
  id: string;
  name: string;
  description: string | null;
  type: PropertyType;
  groupId: string | null;
}

export interface CreatePropertyDTO {
  name: string;
  description: string | null;
  type: PropertyType;
  groupId: string | null;
}

export interface Group {
  id: string;
  name: string;
  description: string | null;
  properties: Property[];
}

export interface CreateGroupDTO {
  name: string;
  description: string | null;
}

export interface Record {
  id: string | null;
  type: PropertyType;
  parentId: string;
  month: number;
  year: number;
  transactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  // internal fields (not stored in database)
  monthName?: string | null;
  parentName?: string | null;
}

export interface CreateRecordDTO {
  id: string | null,
  type: PropertyType;
  parentId: string;
  month: number;
  year: number;
  transactions: Transaction[];
}

export interface Transaction {
  title: string;
  description: string | null;
  amount: number;
  type: ExpenseType;
  // internal fields (not stored in database)
  temporalId?: string;
}

export interface MonthlySummaryRecordDTO {
  month: number;
  year: number;
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  // internal fields (not stored in database)
  monthName?: string | null;
}

export interface ParentSummaryRecordDTO {
  year: number;
  netIncome: number;
  parentType: PropertyType;
  parentId: string;
  parentName: string;
  // internal fields (not stored in database)
  fill?: string;
}

export type PropertyType = 'INDIVIDUAL' | 'GROUPED';

export type ExpenseType = 'INCOME' | 'EXPENSE';