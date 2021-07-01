import React from 'react';
import {Meta, Story} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {App} from "../App";


export default {
    title: 'TODOLIST/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator],
} as Meta;

const Template: Story = () => <App />;

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {};