import { useCallback } from "react"
import { useContext } from "./ContextProvider"
import Link from "./Link"
import classnames from "classnames"
import { PlusIcon } from "@heroicons/react/24/solid"

const TodoItem = (props) => {
  const { todo, index } = props
  const { setCurrentCategory, currentCategory } = useContext()
  const completedTaskLength = todo.todo_tasks.filter(({ completed }) =>
    Boolean(completed)
  ).length
  const taskLength = todo.todo_tasks.length
  const handleClick = useCallback(
    (event) => {
      const categoryId = Number.parseInt(
        event.currentTarget.getAttribute("data-category-index"),
        10
      )
      document
        .querySelector(`[data-category-index="${categoryId}"]`)
        .scrollIntoView({ behavior: "smooth", block: "start" })
      setCurrentCategory(categoryId)
    },
    [setCurrentCategory]
  )

  return (
    <div>
      <div
        onClick={handleClick}
        data-category-index={index}
        className="flex gap-3 p-4 border-b-0 border rounded-t-md min-w-20 h-20 items-center font-bold cursor-pointer"
      >
        <h3>{todo.name}</h3>
        <div>
          {completedTaskLength > 0 ? (
            <span className="bg-lime-500 px-2 rounded-l-full">
              {completedTaskLength}
            </span>
          ) : (
            ""
          )}
          <span
            className={classnames(
              "bg-sky-700 px-2",
              completedTaskLength > 0 ? "rounded-r-full" : "rounded-full"
            )}
          >
            {taskLength}
          </span>
        </div>
      </div>
      {currentCategory === index ? (
        <div className="w-full h-1 bg-gray-200">
          <div
            style={{ width: (completedTaskLength / taskLength) * 100 + "%" }}
            className="bg-lime-700 h-full duration-200"
          ></div>
        </div>
      ) : null}
    </div>
  )
}

export const TodoList = () => {
  const { state } = useContext()

  return (
    <div className="flex mt-2 border-b w-full overflow-y-scroll">
      {state.map((todo, index) => (
        <TodoItem key={index} todo={todo} index={index}></TodoItem>
      ))}
      <Link
        href="/category/create"
        className="flex justify-center align-center w-14 border border-b-0 rounded-t-md p-3 ml-auto mr-5 border-b-none"
      >
        <PlusIcon className="w-8"></PlusIcon>
      </Link>
    </div>
  )
}
