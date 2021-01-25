import { EmailValidator } from "@angular/forms";

export interface Password {
  oldPw: string;
  newPw: string;
  currentPw?: string;
  email?: string;
  pw?: string;
}

