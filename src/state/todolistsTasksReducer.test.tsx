import {TasksStateType, TodoListType} from "../App";
import {actionsForTodoLists, todoListsReducer} from "./todoListsReducer";
import {tasksReducer} from "./tasksReducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: Array<TodoListType> = []

    const action = actionsForTodoLists.addTodoList("new todolist")

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].todoListId

    expect(idFromTasks).toBe(action.todoListId)
    expect(idFromTodoLists).toBe(action.todoListId)
})
