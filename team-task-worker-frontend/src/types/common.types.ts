export type ID = string;

export type Timestamped = {
  createdAt?: string;
  updatedAt?: string;
};

export type SelectOption<T extends string = string> = {
  label: string;
  value: T;
};
