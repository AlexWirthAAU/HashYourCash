import {Category} from './category';

export interface Payment {
  type: string;
  amount: number;
  description: string;
  comment: string;
  pe_id: number;
  w_id: number;
  c_id: number;
  category?: Category;
  entry_date: Date;
}
