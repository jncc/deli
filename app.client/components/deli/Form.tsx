
import * as React from 'react'
import { Header, Segment, Icon, Input } from 'semantic-ui-react'

import { config } from '../../config/config'
import { Query } from '../models/Query'
import { GetProductsResult, Product } from '../../../app.server/handlers/products/models'
import { Tooltip } from './Widgets'

interface FormProps {
  query: Query
  queryChanged: (query: Query) => void
  result: GetProductsResult
}

export function Form(props: FormProps) {

  let bboxChanged = (e: any) => {
    props.query.bbox = JSON.parse(e.target.value)
    props.queryChanged(props.query)
  }


  return (
    <Segment inverted color='grey' style={{ marginBottom: 0 }}>
      <Header>
        <Icon name='block layout' />
        {props.result.collections.map(c => c.metadata.title).join(', ')}
      </Header>
      <Segment>
        {getBboxUI(props)}
        {getStartEndUI(props)}
      </Segment>
    </Segment>
  )
}

const getBboxUI = (props: FormProps) => {

  let bboxArea = formatNumberWithCommas(props.result.query.bboxArea) + ' km²'
  let bboxUI = <Input value={bboxArea} label='bounding box' readOnly />

   return <Tooltip
          content='Use the handles on the map to change the bounding box'
          trigger={bboxUI}
          on='focus' />
}

const getStartEndUI = (props: FormProps) => {

  let startChanged = (e: any) => {
    props.query.start = e.target.value
    props.queryChanged(props.query)
  }

  let endChanged = (e: any) => {
    props.query.end = e.target.value
    props.queryChanged(props.query)
  }

  if (config.form.start && config.form.end) {
    return (
      <div>
        <label>From</label>
        <Input value={props.query.start} onChange={startChanged} className='' placeholder='Start date'></Input>
        <label>To</label>
        <Input value={props.query.end} onChange={endChanged} className='' placeholder='End date'></Input>
      </div>
    )
  } else {
    return <div />
  }
}

// https://stackoverflow.com/a/2901298
function formatNumberWithCommas(n: number) {
    var parts = n.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
