
import * as React from 'react'
import { Segment, Label, Header } from 'semantic-ui-react'

import { config } from '../../config'

interface SummaryProps {
  productCount: number
}

export function Summary(props: SummaryProps) {

  let tooManyProducts = props.productCount > config.maxProductCount

  return (
    <div>
      {productCountUI(props.productCount, tooManyProducts)}
      {/*<button className='btn btn-danger' disabled={tooManyProducts}
        onClick={getLinkClicked}>Get Link</button>*/}
    </div>
  )
}

const productCountUI = (productCount: number, tooManyProducts: boolean) => {

  if (tooManyProducts) {
    return (
      <div className='summary'>
        <Label size='huge' circular color='purple'>{config.maxProductCount}+</Label>
        <span className='summary-header'>products found</span>
        <span className='summary-subheader'>Only the first {config.maxProductCount} are shown</span>
      </div>
    )
  } else {
    return (
      <div className='summary'>
        <Label size='huge' circular color='purple'>{productCount}</Label>
        <span className='summary-header'>products found</span>
      </div>
    )
  }
}
