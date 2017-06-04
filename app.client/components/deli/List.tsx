
import * as React from 'react'
import * as moment from 'moment'
import { Button, Grid } from 'semantic-ui-react'
const FlipMove = require('react-flip-move')

import { Tooltip } from './Widgets'
import { Product } from '../../../app.server/handlers/products/models'
import { formatBytes } from '../../utility/formatBytes'
import { WmsModalButton } from "../shared/WmsModalButton";


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

  let rows5 = props.products.map(p =>
    <div key={p.id} className='product'>
      <div className='product-left'>
        blah
      </div>
      <div className='product-main'>
        <div>
          {p.title}
        </div>
        <div>
          {getPropertiesUI(p)}
        </div>
      </div>
      <div className='product-right'>
        {getDownloadButtonUI(p)}
      </div>
    </div>
  )

  return (
      <FlipMove {...flipMoveAnimationProps}>
        {rows5}
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
  return (
    <div>
      <div className='spaced barely'>
        {p.data.download && p.data.download.size &&
        <form
          method='get'
          action={p.data.download.url}
          style={({ display: 'inline' })}>
          <Button
            content='Download'
            title='Download entire dataset'
            color='grey'
          />
        </form>
        }
        {p.data.wms &&
        <WmsModalButton wms={p.data.wms} />
        }
      </div>
      {p.data.download && p.data.download.size &&
      <div>
        <span style={({ fontSize: '.85714286rem', color: 'rgba(0,0,0,.6)', fontWeight: 'bold' })}>
          {formatBytes(p.data.download.size, 0)} {p.data.download.type}
        </span>
      </div>
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

const rowStyle: React.CSSProperties = {
  marginBottom: '4px',
  backgroundColor: '#ddd',
}
