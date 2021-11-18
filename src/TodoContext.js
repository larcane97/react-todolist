import React, { useReducer } from "react";

const initialTodos = [
  {
    id: 1,
    text: "create project",
    done: false,
  },
  {
    id: 2,
    text: "styling components",
    done: false,
  },
  {
    id: 3,
    text: "distribute API",
    done: true,
  },
  {
    id: 4,
    text: "model optimization",
    done: true,
  },
];

function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return state.concat(action.todo);

    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );

    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);

    default:
      throw new Error(`Unhandled action type : ${action.type}`);
  }
}

const TodoStateContext = React.createContext();
const TodoDispatchConext = React.createContext();
const TodoNextIdContext = React.createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = React.useRef(state.length + 1);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchConext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchConext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  const context = React.useContext(TodoStateContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}

export function useTodoDispatch() {
  const context = React.useContext(TodoDispatchConext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}

export function useNextId() {
  const context = React.useContext(TodoNextIdContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}
