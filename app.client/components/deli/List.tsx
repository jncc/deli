
import * as React from 'react'
import * as moment from 'moment'
import { Button, Grid, Header } from 'semantic-ui-react'
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
    <div
      key={p.id + '-' + p.title} // in case id isn't unique for some bad data reason
      className='product'
      onMouseOver={() => props.productHovered(p)} onMouseOut={() => props.productUnhovered(p)}
      >
      <div className={`product-left ${props.hovered && props.hovered.id == p.id ? 'product-hilite' : ''}`}>
      </div>
      <div className='product-main'>
        <div className='product-title'>{p.title}</div>
        <div>
          {getPropertiesUI(p)}
        </div>
      </div>
      <div className='product-right'>
        {getDownloadAndWmsButtonUI(p)}
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

function getDownloadAndWmsButtonUI(p: Product) {
  return (
    <div>
      {p.data.download && p.data.download.size &&
      <form
        method='get'
        action={p.data.download.url}
        style={{ display: 'inline' }}>
        <Button
          content='Download'
          title='Download product'
          color='grey'
          type='submit' // needed for analytics
        />
      </form>
      }
      {p.data.wms &&
      <WmsModalButton wms={p.data.wms} />
      }
      {p.data.download && p.data.download.size &&
      <div>
        <span className='download-file-size-info'>
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
