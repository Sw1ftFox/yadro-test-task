export const Modes = {
  ADD: "add",
  EDIT: "edit"
} as const;

export type ModesType = typeof Modes[keyof typeof Modes];
