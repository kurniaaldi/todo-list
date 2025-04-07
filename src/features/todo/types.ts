export interface TodoItem {
  id: number;
  title: string;
  category: string;
  completed: boolean;
  description: string;
}

export interface TodoFilter {
  status: "all" | "done" | "pending";
  category: "all" | string;
  keyword: string;
}

export interface TodoState {
  todos: TodoItem[];
  loading: boolean;
  categories: string[];
  filter: TodoFilter;
}
