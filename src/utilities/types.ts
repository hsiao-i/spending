export interface CategoryIcon {
  id: number,
  name: string,
  iconName: string
}

export type UserLogin = {
  email: string;
  password: string;
} 

export interface UserRegister {
  uuid: string
  name: string;
  email: string;
  password: string;
  phone: string;
}


