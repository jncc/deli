
import * as React from 'react'
import * as ReactModal from 'react-modal'
import { Container, Grid, Segment } from 'semantic-ui-react'

import { flatMap } from '../../../app.shared/util'

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
  query:            Query   // the current query
  result:           GetProductsResult
  hovered:          Product | undefined
  queryChanged:     (query:   Query)   => void
  productHovered:   (product: Product) => void
  productUnhovered: (product: Product) => void
  wmsLink:          string
  pending:          number
}

export function Layout(props: LayoutProps) {

  return (
    <div>
      <Head pending={props.pending} />
      <Container>
        <Grid>
          <Grid.Column width={6}>
            <Map
              query={props.query}
              result={props.result}
              hovered={props.hovered}
              queryChanged={props.queryChanged}
              productHovered={props.productHovered}
              productUnhovered={props.productUnhovered}  />
          </Grid.Column>
          <Grid.Column width={10}>
            <Form
              query={props.query}
              queryChanged={props.queryChanged}
              result={props.result}
              />
            <Summary
              productCount={flatMap(props.result.collections, c => c.products).length}
              />
            <List
              products={flatMap(props.result.collections, c => c.products)}
              hovered={props.hovered}
              productHovered={props.productHovered}
              productUnhovered={props.productUnhovered}
              />
          </Grid.Column>
        </Grid>
      </Container>
      <Foot />
    </div>
  )
}
