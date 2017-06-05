
import * as React from 'react';
import { Header, Segment, Icon, Input } from 'semantic-ui-react'

import { config } from '../../config';
import { Query } from '../models/Query';
import { GetProductsResult, Product } from '../../../app.server/handlers/products/models';
import { Tooltip } from './Widgets';

interface FormProps {
  query: Query;
  queryChanged: (query: Query) => void;
  result: GetProductsResult;
}

export function Form(props: FormProps) {

  let bboxChanged = (e: any) => {
    props.query.bbox = JSON.parse(e.target.value);
    props.queryChanged(props.query);
  }

  let bboxUI = <Input
              value={JSON.stringify(props.query.bbox)}
              label='bounding box'
              readOnly // onChange={bboxChanged}
              />;

  return (
    <Segment inverted color='grey' style={{ marginBottom: 0 }}>
      <Header>
        <Icon name='block layout' />
        {props.result.collections.map(c => c.metadata.title).join(', ')}
      </Header>
      { getStartEndUI(props) }
      <Segment>
        <Tooltip
          content='Use the handles on the map to change the bounding box'
          trigger={bboxUI}
          on='focus' />
      </Segment>
    </Segment>
  );
}

const getStartEndUI = (props: FormProps) => {

  let startChanged = (e: any) => {
    props.query.start = e.target.value;
    props.queryChanged(props.query);
  }

  let endChanged = (e: any) => {
    props.query.end = e.target.value;
    props.queryChanged(props.query);
  }

  if (config.form.start && config.form.end) {
    return (
      <div>
        <label>From</label>
        <input type='text' value={props.query.start} onChange={startChanged} className='' placeholder='Start date'></input>
        <label>To</label>
        <input type='text' value={props.query.end} onChange={endChanged} className='' placeholder='End date'></input>
      </div>
    );
  } else {
    return <div />
  }
};
