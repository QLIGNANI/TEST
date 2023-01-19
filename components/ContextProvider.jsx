import {
  createContext,
  useCallback,
  useContext as useNativeContext,
  useState,
} from "react"

const initialState = [
  {
    name: "Javascript list!",
    id: 0,
    todo_tasks: [
      {
        id: 0,
        content: "javascript-todo",
        completed: false,
      },
      {
        id: 1,
        content: "react-todo",
        completed: true,
      },
    ],
  },
  {
    name: "Python list!",
    id: 1,
    todo_tasks: [
      {
        id: 2,
        content: "flask-todo",
        completed: false,
      },
      {
        id: 3,
        content: "cli-todo",
        completed: false,
      },
    ],
  },
  {
    name: "A test!",
    id: 2,
    todo_tasks: [],
  },
]

initialState[2].todo_tasks = new Array(500).fill(0).map((_, index) => ({
  id: index + 800, // I am using 800 as a test index. That way I don't have to worry about ids being duplicate during a demo.
  content: `Item ${index}`,
  completed: false,
}))

export const Context = createContext()

export const useContext = () => useNativeContext(Context)

const ContextProvider = (props) => {
  const [nextTaskId, setNextTaskId] = useState(4)
  const [nextTodoId, setNextTodoId] = useState(3)
  const [currentCategory, setCurrentCategory] = useState(0)
  const [state, setState] = useState(initialState)
  const [filter, toggleFilter] = useState(false)

  const getNextTodoId = useCallback(() => {
    setNextTodoId(nextTodoId + 1)

    return nextTodoId
  }, [nextTodoId])

  const getNextTaskId = useCallback(() => {
    setNextTaskId(nextTaskId + 1)

    return nextTaskId
  }, [nextTaskId])

  const createTodo = useCallback(
    (todoName) => {
      setState((state) => [
        ...state,
        {
          name: todoName,
          id: getNextTodoId(),
          todo_tasks: [
            {
              content: "Add new things to this todo",
              id: getNextTaskId,
              completed: false,
            },
          ],
        },
      ])
    },
    [getNextTodoId, getNextTaskId]
  )

  const createTask = useCallback(
    (todo, currentCategory) => {
      const newState = state.slice()
      newState[currentCategory].todo_tasks.push({
        id: getNextTaskId(),
        content: todo,
        completed: false,
      })
      setState(newState)
    },

    [getNextTaskId, state]
  )

  const deleteTodo = useCallback((todoId) => {
    setState((state) => state.filter(({ id }) => id != todoId))
  }, [])

  const deleteTask = useCallback(
    (taskId, currentCategory) => {
      const newState = state.slice()
      newState[currentCategory].todo_tasks = newState[
        currentCategory
      ].todo_tasks.filter(({ id }) => id !== taskId)
      setState(newState)
    },
    [state]
  )

  const updateTodo = useCallback((todoId, newName) => {
    setState((state) =>
      state.map((todo) =>
        todo.id === todoId
          ? { name: newName, id: todo.id, todo_tasks: todo.todo_tasks }
          : todo
      )
    )
  }, [])

  const updateTask = useCallback(
    (updatedTask, currentCategory) => {
      const newState = state.slice()
      newState[currentCategory].todo_tasks = newState[
        currentCategory
      ].todo_tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
      setState(newState)
    },
    [state]
  )

  return (
    <Context.Provider
      {...props}
      value={{
        state,
        currentCategory,
        filter,
        toggleFilter,
        setCurrentCategory,
        createTask,
        deleteTask,
        updateTask,
        deleteTodo,
        updateTodo,
        createTodo,
      }}
    />
  )
}

export default ContextProvider
