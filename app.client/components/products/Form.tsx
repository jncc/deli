
import * as React from 'react'
import { Header, Segment, Icon, Input, Form as F, Grid } from 'semantic-ui-react'

// imports for DateTimePikcer
// import { DateTimePicker } from 'react-widgets';
// import 'react-widgets/lib/less/react-widgets.less';
// let Moment = require('moment')
// let momentLocalizer = require('react-widgets/lib/localizers/moment')
// momentLocalizer(Moment)

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
  return (
    <Segment inverted color='grey' style={{ marginBottom: 0 }}>
      <Header>
        <Icon name='block layout' />
        {props.result.collections.map(c => c.metadata.title).join(', ')}
      </Header>
      <Segment>
        {/*<Grid columns='equal' relaxed stackable>*/}
        <div className='form-fields'>
          {getBboxUI(props)}
          {getStartEndUI(props)}
          {/*{getDatepickerUI(props)}*/}
        </div>
        {/*</Grid>*/}
      </Segment>
    </Segment>
  )
}

let getBboxUI = (props: FormProps) => {

  let bboxArea = formatNumberWithCommas(props.result.query.bboxArea) + ' km²'
  let inputUI = <Input
    value={bboxArea}
    label='bounding box'
    style={{width: '10rem'}}
    readOnly />

  return (
    <div>
      <Tooltip
        content='Use the handles on the map to change the bounding box'
        trigger={inputUI}
        on='focus' />
    </div>
  )
}

let getStartEndUI = (props: FormProps) => {

  let startChanged = (e: any) => {
    props.query.start = e.target.value
    props.queryChanged(props.query)
  }

  let endChanged = (e: any) => {
    props.query.end = e.target.value
    props.queryChanged(props.query)
  }

  if (config.form.start && config.form.end) { // todo change config.form.startend
    return (
      <div>

        <Input
          value={props.query.start}
          onChange={startChanged}
          placeholder='yyyy-mm-dd'
          style={{width: '14rem'}}
          label='from'
          />
        <Input
          value={props.query.end}
          onChange={endChanged}
          placeholder='yyyy-mm-dd'
          style={{width: '8rem'}}
          label='to'
          />
      </div>
    )
  } else {
    return null
  }
}

let getDatepickerUI = (props: FormProps) => {
  // return <DateTimePicker
  //         defaultValue={new Date()}
  //         time={false}
  //         finalView='decade'
  //         />
}

// https://stackoverflow.com/a/2901298
function formatNumberWithCommas(n: number) {
    var parts = n.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
