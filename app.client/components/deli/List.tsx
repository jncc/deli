
import * as React from 'react'
import * as moment from 'moment'
import { Button, Grid } from 'semantic-ui-react'
const FlipMove = require('react-flip-move')

import { Tooltip } from './Widgets'
import { Product } from '../../../app.server/handlers/products/models'
import { formatBytes } from '../../utility/formatBytes'


interface ListProps {
  products:         Product[]
  hovered:          Product | undefined
  productHovered:   (product: Product) => void
  productUnhovered: (product: Product) => void
}

export function List(props: ListProps) {

  let rows = props.products.map(p =>
    <Grid.Row
      style={({ backgroundColor: 'red' })}
      key={p.id}
      className='item'
      onMouseOver={() => props.productHovered(p)} onMouseOut={() => props.productUnhovered(p)}>
      <Grid.Column width={1} >
              <div className={`item-hilite ${props.hovered && props.hovered.id == p.id ? 'item-hilite-hovered' : ''}`}>
              </div>
      </Grid.Column>
      <Grid.Column width={10}>
            <div className='item-main-title'>{p.title}</div>
            <div className='item-main-cell'>
              {getPropertiesUI(p)}
            </div>
      </Grid.Column>
      <Grid.Column width={5}>
            {getDownloadTypeUI(p)}
            {getDownloadButtonUI(p)}
      </Grid.Column>
    </Grid.Row>
  )

  let rows2 = props.products.map(p =>
    <div style={rowStyle} key={p.id}>
      {p.title}
    </div>
  )

  let rows3 = props.products.map(p =>
    <Grid.Row style={rowStyle} key={p.id}>
      <Grid.Column width={16}>
        {p.title}
      </Grid.Column>
    </Grid.Row>
  )

  let rows4 = props.products.map(p =>
    <MyRow p={p}>
      <Grid.Column width={16}>
        {p.title}
      </Grid.Column>
    </MyRow>
  )

  let rows5 = props.products.map(p =>
    <div key={p.id} className='product'>
      <div className='product-left'>
        blah
      </div>
      <div className='product-main'>
        {p.title}
      </div>
      <div className='product-right'>
        blah
      </div>
    </div>
  )




//  return <Grid>{rows}</Grid>
  return (
      <FlipMove {...flipMoveAnimationProps}>
        {rows5}
      </FlipMove>
  )
}

class MyRow extends React.Component<{ p: Product }, any> {
  render() {
    return <Grid.Row style={rowStyle} key={this.props.p.id}>{this.props.children}</Grid.Row>
  }
}

function getPropertiesUI(p: Product) {
  return Object.keys(p.properties).map((key) => {
    let value = p.properties[key]
    let displayValue = key.endsWith('date')
      ? moment(value).format('D MMM YYYY')
      : value
    return (
      <span key={key + '-' + value}>
        <span className='item-main-property-label'>{key}</span>
        <span className='item-main-property-value'>{displayValue}</span>
      </span>)
    }
  )
}

function getDownloadTypeUI(p: Product) {
  if (p.data.download) {
    return (
      <div className='item-right'>
        <span className='item-right-download-type'>{p.data.download.type}</span>
        <br />
        <span>{formatBytes(p.data.download.size, 0)}</span>
      </div>
    )
  }
  else {
    return <div />
  }
}

function getDownloadButtonUI(p: Product) {
  if (p.data.download) {
    return (
      <div className='item-right'>
        <Tooltip
          trigger={
            <form method='get' action={p.data.download.url}>
              <button className='btn btn-default' type='submit'>
                <span className='btn-glyphicon glyphicon glyphicon-download-alt'></span>
                Download
              </button>
            </form>
          } content='Download' />
      </div>
    )
  }
  else {
    return <div />
  }
}


const flipMoveAnimationProps = {
  duration:          200,
  enterAnimation:    'fade',
  leaveAnimation:    'accordianVertical',
  staggerDurationBy: 25,
}

const rowStyle: React.CSSProperties = {
  marginBottom: '4px',
  backgroundColor: '#ddd',
}
