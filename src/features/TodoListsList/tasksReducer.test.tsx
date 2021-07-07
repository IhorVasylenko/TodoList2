import {actionsForTasks, tasksReducer, TasksStateType} from './tasksReducer';
import {actionsForTodoLists, TodoListDomainType} from "./todoListsReducer";
import {TaskPriorities, TaskStatuses} from "../../api/todoListsAPI";


let startState: TasksStateType = {}

beforeEach (() => {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New , description: '',
                priority: TaskPriorities.Middle, startDate: '', deadline: '', todoListId: "todoListId1",
                order: 0, addedDate: '',},
            { id: "2", title: "JS", status: TaskStatuses.Completed,  description: '',
                priority: TaskPriorities.Middle, startDate: '', deadline: '', todoListId: "todoListId1",
                order: 0, addedDate: '',},
            { id: "3", title: "React", status: TaskStatuses.New,  description: '',
                priority: TaskPriorities.Middle, startDate: '', deadline: '', todoListId: "todoListId1",
                order: 0, addedDate: '',},
        ],

        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, description: '',
                priority: TaskPriorities.Middle, startDate: '', deadline: '', todoListId: "todoListId2",
                order: 0, addedDate: '', },
            { id: "2", title: "milk", status: TaskStatuses.Completed, description: '',
                priority: TaskPriorities.Middle, startDate: '', deadline: '', todoListId: "todoListId2",
                order: 0, addedDate: '',},
            { id: "3", title: "tea", status: TaskStatuses.New, description: '',
                priority: TaskPriorities.Middle, startDate: '', deadline: '', todoListId: "todoListId2",
                order: 0, addedDate: '',},
        ]
    };
});

test('correct task should be deleted from correct array', () => {
    const action = actionsForTasks.removeTask("2", "todolistId2");
    const endState = tasksReducer(startState, action);

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New , description: '',
                priority: TaskPriorities.Middle, startDate: '', deadline: '', todoListId: "todoListId1",
                order: 0, addedDate: '',},
            { id: "2", title: "JS", status: TaskStatuses.Completed,  description: '',
                priority: TaskPriorities.Middle, startDate: '', deadline: '', todoListId: "todoListId1",
                order: 0, addedDate: '',},
            { id: "3", title: "React", status: TaskStatuses.New,  description: '',
                priority: TaskPriorities.Middle, startDate: '', deadline: '', todoListId: "todoListId1",
                order: 0, addedDate: '',},
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, description: '',
                priority: TaskPriorities.Middle, startDate: '', deadline: '', todoListId: "todoListId2",
                order: 0, addedDate: '', },
            { id: "3", title: "tea", status: TaskStatuses.New, description: '',
                priority: TaskPriorities.Middle, startDate: '', deadline: '', todoListId: "todoListId2",
                order: 0, addedDate: '',},
        ]
    });
});

test('correct task should be added to correct array', () => {
    const action = actionsForTasks.createTask({
        id: "4", title: "juice", status: TaskStatuses.New , description: '',
        priority: TaskPriorities.Middle, startDate: '', deadline: '', todoListId: "todolistId2",
        order: 0, addedDate: '',
    });
    const endState = tasksReducer(startState, action);

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});

test('status of specified task should be changed', () => {
    const action = actionsForTasks.updateTask("2", {status: TaskStatuses.New}, "todolistId2");
    const endState = tasksReducer(startState, action);

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified task should be changed', () => {
    const action = actionsForTasks.updateTask("2", {title: "juice"}, "todolistId2");
    const endState = tasksReducer(startState, action);

    expect(endState["todolistId2"][1].title).toBe("juice");
    expect(endState["todolistId1"][1].title).toBe("JS");
});

test('new array should be added when new todolist is added', () => {
    let newTodoList: TodoListDomainType = {
        title: "New title",
        id: "1",
        order: 1,
        filter: "all",
        addedDate: "",
    };
    const action = actionsForTodoLists.createTodoList(newTodoList);
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {throw Error("new key should be added")}

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const action = actionsForTodoLists.removeTodoList("todolistId2");
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});

test('empty arrays should be added when we set todoLists', () => {
    const action = actionsForTodoLists.setTodoLists([
        {id: '1', title: 'What to learn', order: 0, addedDate: '',},
        {id: '2', title: 'What to buy', order: 0, addedDate: '',},
    ]);
    const endState = tasksReducer({}, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState["1"]).toStrictEqual([]);
    expect(endState["2"]).toStrictEqual([]);
});

test('tasks should be added for todoList', () => {
    const action = actionsForTasks.setTasks("todolistId1", startState["todolistId1"]);
    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": [],
    }, action);

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(0);
});


