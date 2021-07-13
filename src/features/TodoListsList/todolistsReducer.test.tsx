import {v1} from "uuid";
import {actionsForTodoLists, FilterValuesType, TodoListDomainType, todoListsReducer} from "./todoListsReducer";
import {RequestStatusType} from "../../app/appReducer";


let todoListId1: string;
let todoListId2: string;
let startState: Array<TodoListDomainType> = [];

beforeEach (() => {
    todoListId1 = v1();
    todoListId2 = v1();
    startState = [
        {id: todoListId1, title: 'What to learn', filter: 'all', order: 0, addedDate: '', entityStatus: "idle",},
        {id: todoListId2, title: 'What to buy', filter: 'all', order: 0, addedDate: '', entityStatus: "idle",},];
});

test('correct todolist should be removed', () => {
    const action = actionsForTodoLists.removeTodoList(todoListId1);
    const endState = todoListsReducer(startState, action);

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
});

test('correct todolist should be added', () => {
    let newTodoList: TodoListDomainType = {
        title: "New title",
        id: "1",
        order: 1,
        filter: "all",
        addedDate: "",
        entityStatus: "idle",
    };

    const action = actionsForTodoLists.createTodoList(newTodoList);
    const endState = todoListsReducer(startState, action);

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodoList.title);
});

test('correct todolist should change its name', () => {
    let newTodoListTitle = "New Todolist";

    const action = actionsForTodoLists.updateTodoListTitle(todoListId2, newTodoListTitle);
    const endState = todoListsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodoListTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const action = actionsForTodoLists.updateTodoListFilter(todoListId2, newFilter);
    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('todoLists should be set to the state', () => {

    const action = actionsForTodoLists.setTodoLists(startState);
    const endState = todoListsReducer([], action);

    expect(endState.length).toBe(2);
});

test('correct entity status of todolist should be changed', () => {
    let newStatus: RequestStatusType = "loading";

    const endState = todoListsReducer(startState, actionsForTodoLists.updateTodoListEntityStatus(todoListId2, newStatus));

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe(newStatus);
});