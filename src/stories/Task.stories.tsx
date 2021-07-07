import React from 'react';
import {Meta, Story} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task, TasksType} from "../Task";
import {TaskPriorities, TaskStatuses} from "../api/todoListsAPI";


export default {
    title: 'TODOLIST/Task',
    component: Task,
} as Meta;

const changeTaskStatusCallback = action('Status changed inside Task');
const changeTaskTitleCallback = action('Title changed inside Task');
const removeTaskCallback = action('Remove Button inside Task clicked');

const Template: Story<TasksType> = (args) => <Task {...args} />;

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback,
}

/*export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', status: TaskStatuses.Completed, title: 'JS', description: '', completed: false,
        priority: TaskPriorities.Middle, startDate: '', deadline: '', todoListId: "todoListId1", order: 0, addedDate: '',},
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '2', status: TaskStatuses.New, title: 'CSS', description: '', completed: false,
        priority: TaskPriorities.Middle, startDate: '', deadline: '', todoListId: "todoListId2", order: 0, addedDate: '',},
};*/

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1',
        status: TaskStatuses.Completed,
        title: 'JS',
        description: '',
        priority: TaskPriorities.Middle,
        startDate: '',
        deadline: '',
        todoListId: "todoListId1",
        order: 0,
        addedDate: '',},
    todoListId: "todoListId1",
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {
        id: '2',
        status: TaskStatuses.New,
        title: 'CSS',
        description: '',
        priority: TaskPriorities.Middle,
        startDate: '',
        deadline: '',
        todoListId: "todoListId2",
        order: 0,
        addedDate: '',
    },
    todoListId: "todoListId2",
};