import { Accordion } from '@reactunity/material/accordion';
import { AlertDialog } from '@reactunity/material/alert';
import { Button } from '@reactunity/material/button';
import { Card } from '@reactunity/material/card';
import { ConfirmDialog } from '@reactunity/material/confirm';
import { Paper } from '@reactunity/material/paper';
import { PromptDialog } from '@reactunity/material/prompt';
import { Slider } from '@reactunity/material/slider';
import '@reactunity/material/styles';
import { TextField } from '@reactunity/material/text';
import { Toggle, ToggleGroup } from '@reactunity/material/toggle';
import { Renderer } from '@reactunity/renderer';
import React, { useState } from 'react';
import style from './index.module.scss';

export function App() {
  const [dlOpen, setDlOpen] = useState(0);

  return <scroll className={style.app}>
    <h1>Material Showcase</h1>

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

    <section>
      <h2>Anchor</h2>

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
  </scroll>;
};

Renderer.render(<App />);
