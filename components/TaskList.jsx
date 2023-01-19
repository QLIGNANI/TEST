import { TaskItem } from "./TaskItem"

export const TaskList = (props) => {
  const { state, currentCategory, filterCompleted } = props
  const currentList = state[currentCategory]
  let tasksList

  if (filterCompleted && currentList) {
    tasksList = currentList.todo_tasks.filter(
      ({ completed }) => completed === false
    )
  } else {
    tasksList = currentList.todo_tasks
  }

  return (
    <div className="max-h-[80vh] overflow-x-scroll">
      {currentList ? (
        tasksList.map((task) => <TaskItem key={task.id} task={task}></TaskItem>)
      ) : (
        <h2> There is no task for this todo! Create one c:</h2>
      )}
    </div>
  )
}
