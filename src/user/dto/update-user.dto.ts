export class UpdateUserDto {
  id: number;
  name: string;
  email: string;
  picture: string;
  password: string;
  pitch?: string | null;
  about?: string | null;
  experience?: string | null;
  availability: boolean;
  money: number;
}
