import React from 'react';
import {Meta, Story} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";
import {App} from "./App";


export default {
    title: 'TODOLIST/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator],
} as Meta;

const Template: Story = () => <App demo={false}/>;

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {};