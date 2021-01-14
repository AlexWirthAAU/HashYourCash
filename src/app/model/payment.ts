export interface Payment {
  type: string;
  amount: number;
  description: string;
  comment: string;
  pe_id: number;
  w_id: number;
  c_id: number;
  entry_date: Date;
}
