// TODO Let's move that Soon (tm)

export interface LoginUserInfo {
  username: string;
  email: string;
  password: string;
  provide_email: boolean;
  terms_and_conditions: boolean;
  referral_user_id?: string;
}

export class RegisterUserInfo implements LoginUserInfo {
  username: string;
  email: string;
  password: string;
  provide_email: boolean;
  terms_and_conditions: boolean;
  referral_user_id?: string;
}
