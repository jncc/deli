
import * as React from 'react'
import * as ReactModal from 'react-modal'
import { Container, Grid, Segment } from 'semantic-ui-react'
import * as Sticky from 'react-stickynode'
import * as _ from 'lodash'

import { Head } from '../shared/Head'
import { Foot } from '../shared/Foot'
import { Spinner } from '../shared/Spinner'
import { Form } from './Form'
import { List } from './List'
import { Map } from './Map'
import { Summary } from './Summary'
import { Query } from '../models/Query'
import { GetProductsResult, Product } from '../../../app.server/handlers/products/models'

interface LayoutProps {
  query:             Query   // the current query
  result:            GetProductsResult
  hovered:           Product | undefined
  selected:          Product[]
  queryChanged:      (query:   Query)   => void
  productHovered:    (product: Product) => void
  productUnhovered:  (product: Product) => void
  productSelected:   (product: Product) => void
  getWmsLinkClicked: () => void
  wmsLink:           string
  pending:           number
}

export function Layout(props: LayoutProps) {

  return (
    <div>
      <Head pending={props.pending} />
      <Container fluid className='deli-container'>
        <Grid>
          <Grid.Column width={6}>
            <Sticky top={10}>
              <Map
                query={props.query}
                result={props.result}
                hovered={props.hovered}
                queryChanged={props.queryChanged}
                productHovered={props.productHovered}
                productUnhovered={props.productUnhovered}
              />
            </Sticky>
          </Grid.Column>
          <Grid.Column width={10}>
            <Form
              query={props.query}
              queryChanged={props.queryChanged}
              result={props.result}
            />
            <Sticky innerZ={10}>
              <Summary
                productCount={_.flatMap(props.result.collections, c => c.products).length}
                getWmsLinkClicked={props.getWmsLinkClicked}
                wmsLink={props.wmsLink}
              />
            </Sticky>
            <List
              products={_.flatMap(props.result.collections, c => c.products)}
              hovered={props.hovered}
              selected={props.selected}
              productHovered={props.productHovered}
              productUnhovered={props.productUnhovered}
              productSelected={props.productSelected}
            />
          </Grid.Column>
        </Grid>
      </Container>
      <Foot />
    </div>
  )
}
