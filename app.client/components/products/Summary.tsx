
import * as React from 'react'
import { Segment, Label, Header, Button, ButtonProps } from 'semantic-ui-react'

import { WmsModalButton } from '../shared/WmsModalButton'
import { config } from '../../config/config'

interface SummaryProps {
  productCount:      number
  wmsLink:           string
  getWmsLinkClicked: () => void
}

export function Summary(props: SummaryProps) {

  let tooManyProducts = props.productCount > config.maxProductCount

  return (
    <div className='summary'>
      {getProductCountUI(props.productCount, tooManyProducts)}
      {getWmsLinkUI(props, tooManyProducts)}
    </div>
  )
}

const getProductCountUI = (productCount: number, tooManyProducts: boolean) => {

  if (tooManyProducts) {
    return (
      <div className='summary-count'>
        <Label size='huge' circular color='purple'>{productCount}</Label>
        <span className='summary-count-header'>products found</span>
        <span className='summary-count-subheader'>Only the first {config.maxProductCount} are shown</span>
      </div>
    )
  } else {
    return (
      <div className='summary-count'>
        <Label size='huge' circular color='purple'>{productCount}</Label>
        <span className='summary-count-header'>products found</span>
      </div>
    )
  }
}

const getWmsLinkUI = (props: SummaryProps, tooManyProducts: boolean) => {

  if (config.summary.wms && props.productCount > 0 && !tooManyProducts) {

    let buttonProps: ButtonProps = {
      onClick:       () => props.getWmsLinkClicked(),
      content:       'Get WMS Link',
      icon:          'cloud download',
      labelPosition: 'right',
      color:         'pink',
    }

    return (
      <div className='summary-wms'>
        <WmsModalButton
          buttonProps={buttonProps}
          url={props.wmsLink}
          />
      </div>
    )
  }
  else {
    return null
  }
}
