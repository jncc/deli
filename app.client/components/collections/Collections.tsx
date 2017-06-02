
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Container, Modal, Button, Header, ModalProps, Segment, Input, Label, Icon, Form, Grid } from "semantic-ui-react";

import { Head } from '../shared/Head'
import { Foot } from '../shared/Foot'
import { formatBytes } from '../../utility/formatBytes'
import { Collection, GetCollectionsResult } from '../../../app.server/handlers/collections/models'
import { config } from '../../config'
import { WmsModal } from "../shared/WmsModal";
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
          {this.makeCollectionsListUI2()}
        </Container>
        {/* don't show the footer before anything is loaded, as it looks jumpy */}
        {this.state.collections.length > 0 && <Foot />}
      </div>
    )
  }

  makeCollectionsListUI2() {
    let rows = this.state.collections.map(c => {
      return (
        <Grid.Row key={c.id}>
          <Grid.Column  width='12'>
              <Header>
                <Header.Content>
                  <Icon name='block layout' color='grey' />
                  <Tooltip
                    content='Click to open this data collection'
                    position='bottom center'
                    trigger={<Link to={'/app?collections=' + c.id}>
                                &nbsp;
                                {c.metadata.title}
                             </Link>}
                  />
                </Header.Content>
              </Header>
              <div>
                {c.metadata.abstract}
                &nbsp;
                {this.makeLidarMetadataLinkUI()}
              </div>
          </Grid.Column>

          <Grid.Column width='4' verticalAlign='top'>
            <div className='spaced'>
              <Button content='Products' icon='arrow right' labelPosition='right' color='green' />
            </div>
            <div className='spaced barely'>
                <Button content='Download' color='grey' />
                <Button content='WMS' />
            </div>
            <div className='spaced lots'>
              <span style={({fontSize: '.85714286rem', color: 'rgba(0,0,0,.6)', fontWeight: 'bold'})}>{formatBytes(360000, 0)} Geotiff</span>
            </div>

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

  makeCollectionsListUI() {
    return this.state.collections.map(c => {
      return (
        <div className='collection'>
          <div className='collection-left'>
          </div>
          <div className='collection-main'>


            <div className='collection-main-title'>
              <Link to={'/app?collections=' + c.id}>
                {c.metadata.title}
              </Link>
            </div>

            <div >
              {c.metadata.abstract}
              <span className='collection-main-more-info'>
                <a href='https://www.spatialdata.gov.scot/geonetwork/srv/eng/catalog.search#/metadata/92367c84-74d3-4426-8b0f-6f4a8096f593' target='_blank'>
                  More information &nbsp;
                  <span className='glyphicon glyphicon-share'></span>
                </a>
              </span>

              <div className='collection-main-visualise'>
                <Link className='btn btn-danger'
                    to={'/app?collections=' + c.id}
                    title={'Visualise ' + c.metadata.title}>
                  <span className='btn-glyphicon glyphicon glyphicon-circle-arrow-right'></span>
                  Visualise
                </Link>
              </div>
            </div>

            {this.makeDownloadButtonUI(c)}

          </div>

          {this.makeWmsButtonUI(c)}
        </div>
      )
    })
  }

  makeDownloadButtonUI2(c: Collection) {
    if (c.data.download) {
      return (
        <div>
          <div className='collection-right'>
            <span className='collection-right-download-type'>{c.data.download.type}</span>
            <br />
            <span>{ formatBytes(c.data.download.size, 0) }</span>
          </div>
          <div className='collection-right'>
            <form method='get' action={c.data.download.url}>
              <button className='btn btn-default' type='submit' title='Download entire dataset'>
                <span className='btn-glyphicon glyphicon glyphicon-download-alt'></span>
                Download
              </button>
            </form>
          </div>

        </div>
      )
    } else {
      return <div />
    }
  }

  makeDownloadButtonUI(c: Collection) {
    if (c.data.download) {
      return (
        <div>
          <div className='collection-right'>
            <span className='collection-right-download-type'>{c.data.download.type}</span>
            <br />
            <span>{ formatBytes(c.data.download.size, 0) }</span>
          </div>
          <div className='collection-right'>
            <form method='get' action={c.data.download.url}>
              <button className='btn btn-default' type='submit' title='Download entire dataset'>
                <span className='btn-glyphicon glyphicon glyphicon-download-alt'></span>
                Download
              </button>
            </form>
          </div>

        </div>
      )
    } else {
      return <div />
    }
  }

  makeWmsButtonUI(c: Collection) {
    if (c.data.wms) {
      return <div className='collection-right'><WmsModal wms={c.data.wms} /></div>
    } else {
      return <div />
    }
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

