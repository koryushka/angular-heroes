export class User {
  id:number;
  email:string;
  is_admin: (string | number)[];
  access_token:string;
  refresh_token:string;
  expires_in:string;
  created_at:string;
}
