// 支出和收入類別
export interface CategoryIcon {
  id: number,
  name: string,
  iconName: string
}

// 使用者登入
export type UserLogin = {
  email: string;
  password: string;
};
// 使用者註冊
export interface UserRegister {
  uuid: string
  name: string;
  email: string;
  password: string;
  phone: string;
}

// 銀行列表
export type Bank = {
  id: number;
  code: string;
  name: string;
};
// 銀行帳戶
export interface BankAccount {
  id?: number;
  total: number | string;
  name: string;
  // date: string;
  bankId: number | null;
  userId: string | null;
  bank?: Bank;
  autoIncome?: number;
  autoIncomeDate?: string;
  autoExpense?: number;
  autoExpenseDate?: string;
}
