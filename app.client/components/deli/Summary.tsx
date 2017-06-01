
import * as React from 'react'
import { Segment, Label, Header } from 'semantic-ui-react'

import { config } from '../../config'

interface SummaryProps {
  productCount: number
}


export function Summary(props: SummaryProps) {

  let tooManyProducts = props.productCount > config.maxProductCount

  return (
    <Segment>
      {productCountUI(props.productCount, tooManyProducts)}
      {/*<button className='btn btn-danger' disabled={tooManyProducts}
        onClick={getLinkClicked}>Get Link</button>*/}
    </Segment>
  )
}


const productCountUI = (productCount: number, tooManyProducts: boolean) => {

  if (tooManyProducts) {
    return (
      <div>
        <Header>
          <Header.Content>
            <Label size='huge' circular color='purple'>{config.maxProductCount}+</Label>
            products
            <Header.Subheader>
              Only the first {config.maxProductCount} are shown.
            </Header.Subheader>
          </Header.Content>
        </Header>
      </div>
    )
  } else {
    return (
      <span>
        {/*<span>{props.productCount}</span>
          products selected*/}
      </span>
    )
  }
}
