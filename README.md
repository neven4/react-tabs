# neven4-react-tabs [[![npm version](https://img.shields.io/npm/v/neven4-react-tabs.svg)]]

An accessible and easy tab component for ReactJS.

https://reactcommunity.org/react-tabs/

> Supports React 16.3.0 or newer

## Installing

```bash
yarn add neven4-react-tabs
```
or
```bash
npm install --save neven4-react-tabs
```

## Basic Example

```js
import { Tab, Tabs, Panel } from 'neven4-react-tabs';

export default () => (
  <Tabs>
    <Tab>Title 1</Tab>
    <Tab>Title 2</Tab>

    <Panel>
      <h2>Any content 1</h2>
    </Panel>
    <Panel>
      <h2>Any content 2</h2>
    </Panel>
  </Tabs>
);
```

## License

MIT
