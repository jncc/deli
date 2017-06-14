
import * as React from 'react'
import * as moment from 'moment'
import * as _ from 'lodash';
import { Button, Grid, Header, Checkbox } from 'semantic-ui-react'
const FlipMove = require('react-flip-move')

import { Tooltip } from './Widgets'
import { Product } from '../../../app.server/handlers/products/models'
import { formatBytes } from '../../utility/formatBytes'


interface ListProps {
  products:         Product[]
  hovered:          Product | undefined
  selected:         Product[]
  productHovered:   (product: Product) => void
  productUnhovered: (product: Product) => void
  productSelected:  (product: Product) => void
}

export function List(props: ListProps) {

  let data = _(props.products)
    .map(p => ({
      p: p,
      notSelected: !props.selected.some(s => s === p)
    }))
    .sortBy(['notSelected'])
    .value()

  let rows = data.map(x =>
    <div
      key={x.p.id + '-' + x.p.title} // in case id isn't unique for some bad data reason
      className='product'
      onMouseOver={() => props.productHovered(x.p)} onMouseOut={() => props.productUnhovered(x.p)}
      >
      <div className={`product-hovered ${props.hovered && props.hovered.id == x.p.id ? 'product-hilite' : ''}`}>&nbsp;
      </div>
      <div className='product-checkbox'>
        <Checkbox checked={!x.notSelected} onClick={() => props.productSelected(x.p)} />
      </div>
      <div className='product-main'>
        <div className='product-title'>{x.p.title}</div>
        <div className='product-properties'>
          {getPropertiesUI(x.p)}
        </div>
      </div>
      <div className='product-info'>
        {getProductInfoUI(x.p)}
      </div>
      <div className='product-right'>
        {getDownloadButtonUI(x.p)}
      </div>
    </div>
  )

  return (
    <FlipMove {...flipMoveAnimationProps}>
      {rows}
    </FlipMove>
  )
}

function getPropertiesUI(p: Product) {
  return Object.keys(p.properties).map((key) => {
    let value = p.properties[key]
    let displayValue = key.endsWith('date')
      ? moment(value).format('D MMM YYYY')
      : value
    return (
      <span key={key + '-' + value}>
        <span className='product-property-label'>{key}</span>
        <span className='product-property-value'>{displayValue}</span>
      </span>
    )
  })
}

function getProductInfoUI(p: Product) {
  if (p.data.download && p.data.download.size) {
    return (
      <div>
        <div>{formatBytes(p.data.download.size, 0)}</div>
        <div>{p.data.download.type}</div>
      </div>
    )
  }
  else {
    return <div />
  }
}

function getDownloadButtonUI(p: Product) {
  return (
    <div>
      {p.data.download && p.data.download.size &&
      <form
        method='get'
        action={p.data.download.url}
        style={{ display: 'inline' }}
        data-size={p.data.download.size} // analytics
      >
        <Button
          content='Download'
          title='Download product'
          color='grey'
        />
      </form>
      }
    </div>
  )
}

const flipMoveAnimationProps = {
  duration:          200,
  enterAnimation:    'fade',
  leaveAnimation:    'accordianVertical',
  staggerDurationBy: 25,
}
