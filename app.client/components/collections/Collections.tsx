
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Container, Modal, Button, Header, ModalProps, Segment, Input, Label, Icon, Form, Grid } from "semantic-ui-react";

import { Head } from '../shared/Head'
import { Foot } from '../shared/Foot'
import { formatBytes } from '../../utility/formatBytes'
import { Collection, GetCollectionsResult } from '../../../app.server/handlers/collections/models'
import { config } from '../../config'
import { WmsModalButton } from "../shared/WmsModalButton";
import { Tooltip } from "../deli/Widgets";

interface CollectionsState {
  collections: Collection[]
  pending: number
}

export class Collections extends React.Component<any, CollectionsState> {

  constructor(props: any) {
    super(props)
    this.state = { collections: [], pending: 0 }
  }

  componentDidMount() {
    this.fetchCollections()
  }

  render() {
    return (
      <div>
        <Head pending={this.state.pending} />
        <Container>
          <Header
            as='h1'
            content='Collections'
            subheader='Browse the collections of data products available'>
          </Header>
          <br />
          {this.makeCollectionsListUI()}
        </Container>
        {/* don't show the footer before anything is loaded, as it looks jumpy */}
        {this.state.collections.length > 0 && <Foot />}
      </div>
    )
  }

  makeCollectionsListUI() {
    let rows = this.state.collections.map(c => {
      return (
        <Grid.Row key={c.id}>
          <Grid.Column width='12'>
              <Header>
                <Header.Content>
                  <Icon name='block layout' color='grey' />
                  <Tooltip
                    content='See the products in this data collection'
                    position='bottom center'
                    trigger={<Link to={'/app?collections=' + c.id}>
                                &nbsp;
                                {c.metadata.title}
                             </Link>}
                  />
                </Header.Content>
              </Header>
              <div>
                {c.metadata.abstract} {this.makeLidarMetadataLinkUI()}
              </div>
          </Grid.Column>
          <Grid.Column width='4' verticalAlign='top'>
            <div className='spaced'>
              <Link to={'/app?collections=' + c.id}>
                <Button
                  content='Products'
                  icon='arrow right'
                  labelPosition='right'
                  color='green'
                />
              </Link>
            </div>
            <div className='spaced barely'>
              {c.data.download && c.data.download.size &&
              <form
                method='get'
                action={c.data.download.url}
                style={({ display: 'inline' })}>
                <Button
                  content='Download'
                  title='Download entire dataset'
                  color='grey'
                />
              </form>
              }
              {c.data.wms &&
              <WmsModalButton wms={c.data.wms} />
              }
            </div>
            {c.data.download && c.data.download.size &&
            <div>
              <span style={({ fontSize: '.85714286rem', color: 'rgba(0,0,0,.6)', fontWeight: 'bold' })}>
                {formatBytes(c.data.download.size, 0)} {c.data.download.type}
              </span>
            </div>
            }
          </Grid.Column>
        </Grid.Row>
      )
    })

    return <Grid>{rows}</Grid>
  }

  makeLidarMetadataLinkUI() {
    return (
      <Tooltip
        position='left center'
        content='More information about this data collection'
        trigger={
          <span style={({ marginLeft: '0.5em' })}>
            <a href='https://www.spatialdata.gov.scot/geonetwork/srv/eng/catalog.search#/metadata/92367c84-74d3-4426-8b0f-6f4a8096f593' target='_blank' style={({fontWeight: 'bold'})}>
              Metadata &nbsp;
              <Icon name='external' />
            </a>
          </span>
        }
      />
    )
  }

  fetchCollections() {
    this.setState((prev) => ({ pending: prev.pending + 1 }))
    fetch('/api/collections')
      .then(res => res.json()
        .then((r: GetCollectionsResult) => {
          this.setState({ collections: r.collections })
          this.setState((prev) => ({ pending: prev.pending - 1 }))
        })).catch(ex => {
          console.log(`couldn't get data`, ex)
          this.setState((prev) => ({ pending: prev.pending - 1 }))
        })
  }

}

