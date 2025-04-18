import { PlanStep } from "./plans";
import { UserInterface } from "./User";

export interface PlansResponseInterface {
  success: boolean;
  message: string;
  data: PlanStep[];
}

export interface AuthResponseInterface {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: UserInterface;
  };
}
