type StatusChange = Readonly<{
  hasChanged: boolean;
  isImprovement: boolean;
  message: string;
}>;

export type { StatusChange };
