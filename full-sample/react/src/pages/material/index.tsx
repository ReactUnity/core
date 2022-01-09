import { Accordion } from '@reactunity/material/accordion';
import { AlertDialog } from '@reactunity/material/alert';
import { Button } from '@reactunity/material/button';
import { Card } from '@reactunity/material/card';
import { ConfirmDialog } from '@reactunity/material/confirm';
import { Paper } from '@reactunity/material/paper';
import { PromptDialog } from '@reactunity/material/prompt';
import { Select } from '@reactunity/material/select';
import { Slider } from '@reactunity/material/slider';
import '@reactunity/material/styles';
import { TextField } from '@reactunity/material/text';
import { Toggle, ToggleGroup } from '@reactunity/material/toggle';
import { useDataTooltip } from '@reactunity/material/tooltip';
import React from 'react';
import style from './index.module.scss';
import { VirtualScrolls } from './virtual-scrolls';

export function MaterialPage() {
  const [dlOpen, setDlOpen] = React.useState(0);

  const ttHover = useDataTooltip('hover');
  const ttPress = useDataTooltip('press');
  const ttClick = useDataTooltip('click');

  return <view className={style.app}>
    <h1>Material Showcase 😎</h1>

    <Paper elevation={2}>
      <Button onClick={() => setDlOpen(1)}>Open Alert With Text Only</Button>
      <Button onClick={() => setDlOpen(2)}>Open Alert With Title Only</Button>
      <Button onClick={() => setDlOpen(3)}>Open Alert With Text & Title</Button>

      <AlertDialog open={dlOpen === 1} onClose={() => setDlOpen(0)} backdropClose text={'Some alert text'} />
      <AlertDialog open={dlOpen === 2} onClose={() => setDlOpen(0)} backdropClose title={'Some alert title'} />
      <AlertDialog open={dlOpen === 3} onClose={() => setDlOpen(0)} backdropClose text={'Some alert text'} title={'Some alert title'} />
    </Paper>

    <Paper elevation={2}>
      <Button onClick={() => setDlOpen(4)}>Open Confirm With Text Only</Button>
      <Button onClick={() => setDlOpen(5)}>Open Confirm With Title Only</Button>
      <Button onClick={() => setDlOpen(6)}>Open Confirm With Text & Title</Button>

      <ConfirmDialog open={dlOpen === 4} onClose={() => setDlOpen(0)} backdropClose text={'Some confirm text'} />
      <ConfirmDialog open={dlOpen === 5} onClose={() => setDlOpen(0)} backdropClose title={'Some confirm title'} />
      <ConfirmDialog open={dlOpen === 6} onClose={() => setDlOpen(0)} backdropClose text={'Some confirm text'} title={'Some confirm title'} />
    </Paper>

    <Paper elevation={2}>
      <Button onClick={() => setDlOpen(7)}>Open Prompt With Text Only</Button>
      <Button onClick={() => setDlOpen(8)}>Open Prompt With Title Only</Button>
      <Button onClick={() => setDlOpen(9)}>Open Prompt With Text & Title</Button>

      <PromptDialog open={dlOpen === 7} onClose={() => setDlOpen(0)} backdropClose text={'Some prompt text'} />
      <PromptDialog open={dlOpen === 8} onClose={() => setDlOpen(0)} backdropClose title={'Some prompt title'} />
      <PromptDialog placeholder="Some placeholder" open={dlOpen === 9} onClose={() => setDlOpen(0)} backdropClose text={'Some prompt text'} title={'Some prompt title'} />
    </Paper>

    <Paper elevation={2}>
      Virtual Scrolls:
      <VirtualScrolls />
    </Paper>

    <section>
      <h2>Tooltip</h2>

      <view style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

        <view style={{ alignItems: 'center' }}>
          Hover
          <Button ref={ttHover.register} data-tooltip-offset={20} data-tooltip-position="top" data-tooltip-content="This is shown on top">Top</Button>
          <Button ref={ttHover.register} data-tooltip-position="bottom" data-tooltip-content="This is shown on bottom">Bottom</Button>
          <Button ref={ttHover.register} data-tooltip-position="left" data-tooltip-content="This is shown on left">Left</Button>
          <Button ref={ttHover.register} data-tooltip-position="right" data-tooltip-content="This is shown on right">Right</Button>
          <Button ref={ttHover.register} data-tooltip-position="center" data-tooltip-content="This is shown on center">Center</Button>
          <Button ref={ttHover.register} data-tooltip-anchor="bottom right" data-tooltip-pivot="top left" data-tooltip-content="This is shown on right bottom corner">Custom</Button>
        </view>

        <view style={{ alignItems: 'center' }}>
          Press
          <Button ref={ttPress.register} data-tooltip-offset={20} data-tooltip-position="top" data-tooltip-content="This is shown on top">Top</Button>
          <Button ref={ttPress.register} data-tooltip-position="bottom" data-tooltip-content="This is shown on bottom">Bottom</Button>
          <Button ref={ttPress.register} data-tooltip-position="left" data-tooltip-content="This is shown on left">Left</Button>
          <Button ref={ttPress.register} data-tooltip-position="right" data-tooltip-content="This is shown on right">Right</Button>
          <Button ref={ttPress.register} data-tooltip-position="center" data-tooltip-content="This is shown on center">Center</Button>
          <Button ref={ttPress.register} data-tooltip-anchor="bottom right" data-tooltip-pivot="top left" data-tooltip-content="This is shown on right bottom corner">Custom</Button>
        </view>

        <view style={{ alignItems: 'center' }}>
          Click
          <Button ref={ttClick.register} data-tooltip-offset={20} data-tooltip-position="top" data-tooltip-content="This is shown on top">Top</Button>
          <Button ref={ttClick.register} data-tooltip-position="bottom" data-tooltip-content="This is shown on bottom">Bottom</Button>
          <Button ref={ttClick.register} data-tooltip-position="left" data-tooltip-content="This is shown on left">Left</Button>
          <Button ref={ttClick.register} data-tooltip-position="right" data-tooltip-content="This is shown on right">Right</Button>
          <Button ref={ttClick.register} data-tooltip-position="center" data-tooltip-content="This is shown on center">Center</Button>
          <Button ref={ttClick.register} data-tooltip-anchor="bottom right" data-tooltip-pivot="top left" data-tooltip-content="This is shown on right bottom corner">Custom</Button>
        </view>
      </view>
    </section>

    <section>
      <h2>Card</h2>

      <Card>
        <Card.Content>
          <anchor url="https://www.google.com">Open Google</anchor>
        </Card.Content>
      </Card>
    </section>

    <section>
      <h2>Accordion</h2>

      <Accordion>
        <Accordion.Summary>
          <view>Some stuff is happening</view>
        </Accordion.Summary>

        <Accordion.Content>
          <anchor url="https://www.google.com">Open Google</anchor>
        </Accordion.Content>
      </Accordion>
    </section>

    <section>
      <h2>Slider</h2>

      <Slider allowScroll direction="horizontal" mode="normal" max={100} step={20}>{(val) => val * val}</Slider>
      <Slider allowScroll direction="horizontal" mode="diff" max={100} step={20}>{(val) => val * val}</Slider>
      <Slider allowScroll direction="horizontal-reverse" mode="normal" max={100} step={20}>asdf</Slider>
      <Slider allowScroll direction="horizontal-reverse" mode="diff" max={100} step={20}>asdf</Slider>
    </section>

    <section>
      <view>No Placeholder:</view>

      <TextField variant="standard" />
      <TextField variant="filled" />
      <TextField variant="outlined" />

      <TextField placeholder="Standard with placeholder" variant="standard" />
      <TextField placeholder="Outlined with placeholder" variant="outlined" />
      <TextField placeholder="Filled with placeholder" variant="filled" />

      <TextField placeholder="Password Input" contentType="password" />
    </section>

    <section>
      <Select placeholder={'Regular select'} initialValue="val1">
        <Select.Option value="val1">Option 1</Select.Option>
        <Select.Option value="val2">Option 2</Select.Option>
        <Select.Option value="val3">Option 3</Select.Option>
        <Select.Option value="val4">Option 4</Select.Option>
        <Select.Option value="val5">Option 5</Select.Option>
        <Select.Option value="val6">Option 6</Select.Option>
        <Select.Option value="val7">Option 7</Select.Option>
        <Select.Option value="val8">Option 8</Select.Option>
        <Select.Option value="val9">Option 9</Select.Option>
        <Select.Option value="val10">Option 10</Select.Option>
        <Select.Option value="val11">Option 11</Select.Option>
        <Select.Option value="val12">Option 12</Select.Option>
        <Select.Option value="val13">Option 13</Select.Option>
      </Select>

      <Select multiple initialValue={['val1', 'val2']} placeholder={'Multiple with initial value'}>
        <Select.Option value="val1">Option 1</Select.Option>
        <Select.Option value="val2">Option 2</Select.Option>
        <Select.Option value="val3">Option 3</Select.Option>
      </Select>

      <Select multiple chips initialValue={['val1', 'val2']} placeholder={'Chips selection'}>
        <Select.Option value="val1">Option 1</Select.Option>
        <Select.Option value="val2">Option 2</Select.Option>
        <Select.Option value="val3">Option 3</Select.Option>
        <Select.Option value="val4">Option 4</Select.Option>
        <Select.Option value="val5">Option 5</Select.Option>
      </Select>
    </section>


    <Toggle>Checkbox</Toggle>
    <Toggle indeterminate>Indeterminate</Toggle>


    Radio Group:
    <ToggleGroup>
      <Toggle>Option 1</Toggle>
      <Toggle>Option 2</Toggle>
      <Toggle>Option 3</Toggle>
    </ToggleGroup>

    Checkbox Group:
    <ToggleGroup multiple initialValue={['val1', 'val2']} showSelectAll>
      <Toggle value="val1">Option 1</Toggle>
      <Toggle value="val2">Option 2</Toggle>
      <Toggle value="val3">Option 3</Toggle>
    </ToggleGroup>
  </view>;
};

export default MaterialPage;
