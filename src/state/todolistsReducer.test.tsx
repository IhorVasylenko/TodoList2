import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../AppWithRedux";
import {AddTodoListAC, ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC, todoListsReducer} from "./todoListsReducer";


let todoListId1: string
let todoListId2: string
let startState: Array<TodoListType> = []

beforeEach (() => {
    todoListId1 = v1()
    todoListId2 = v1()
    startState = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}]
})

test('correct todolist should be removed', () => {
    const action = RemoveTodoListAC(todoListId1)
    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test('correct todolist should be added', () => {
    let newTodoListTitle = "New Todolist"

    const action = AddTodoListAC(newTodoListTitle)
    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodoListTitle)
})

test('correct todolist should change its name', () => {
    let newTodoListTitle = "New Todolist"

    const action = ChangeTodoListTitleAC(todoListId2, newTodoListTitle)
    const endState = todoListsReducer(startState, action)

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodoListTitle)
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed"

    const action = ChangeTodoListFilterAC(todoListId2, newFilter)
    const endState = todoListsReducer(startState, action)

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})
