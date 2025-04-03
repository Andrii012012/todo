export interface ITodos {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface IListTodos {
  id: string;
  title: string;
  todos: ITodos[];
  [key: string]: string | ITodos[];
}

export type ITodo = Omit<ITodos, "id">;
