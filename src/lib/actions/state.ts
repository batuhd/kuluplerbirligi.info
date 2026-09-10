export type ActionState = {
  status: "idle" | "error" | "success";
  message: string;
};

export const initialActionState: ActionState = {
  status: "idle",
  message: "",
};

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
};
