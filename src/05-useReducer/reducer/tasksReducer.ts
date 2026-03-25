interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  todos: Todo[];
  lenght: number;
  completed: number;
  pending: number;
}

export type TaskAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOOGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number };

export const getTasksInitialState = (): TaskState => {
  return {
    todos: [],
    completed: 0,
    lenght: 0,
    pending: 0,
  };
};

export const taskReducer = (
  state: TaskState,
  action: TaskAction,
): TaskState => {
  switch (action.type) {
    case "ADD_TODO": {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload.trim(),
        completed: false,
      };

      // ! No se debe hacer, muta
      // state.todos.push(newTodo)

      return {
        ...state,
        todos: [...state.todos, newTodo],
        lenght: state.todos.length + 1,
        pending: state.pending + 1,
      };
    }
    case "DELETE_TODO": {
      const currentTodos = state.todos.filter(
        (todo) => todo.id !== action.payload,
      );

      return {
        ...state,
        todos: currentTodos,
        lenght: currentTodos.length,
        completed: currentTodos.filter((todo) => todo.completed).length,
        pending: currentTodos.filter((todo) => !todo.completed).length,
      };
    }

    case "TOOGLE_TODO": {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      return {
        ...state,
        todos: updatedTodos,
        completed: updatedTodos.filter((todo) => todo.completed).length,
        pending: updatedTodos.filter((todo) => !todo.completed).length,
      };
    }

    default:
      return state;
  }
};
