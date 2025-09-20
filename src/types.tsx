export type HeaderProps = {
  title: string;
  isHome: boolean;
};

export type tasksType = {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: Date;
  updated_at: Date;
};

export type tasksListType = {
  pending: tasksType[];
  completed: tasksType[];
  inProgress: tasksType[];
};
