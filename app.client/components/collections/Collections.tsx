
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Container, Modal, Button, Header, ModalProps, Segment, Input, Label, Icon, Form, Grid, Reveal, Image } from 'semantic-ui-react'

import { getLicenceDetailsFromUseConstraints } from './licenceUtil'
import { Head } from '../shared/Head'
import { Foot } from '../shared/Foot'
import { formatBytes } from '../../utility/formatBytes'
import { Collection, GetCollectionsResult } from '../../../app.server/handlers/collections/models'
import { config } from '../../config/config'
import { WmsModalButton } from '../shared/WmsModalButton'
import { Tooltip } from '../products/Widgets'

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
        <Head pending={this.state.pending} cookieBanner={false} />
        <Container>
          <Header
            as='h1'
            content='Collections'
            subheader='Browse the available collections of data products'>
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
        <Grid.Row key={c.id} className='collection'>
          <Grid.Column width='12'>
              <Header>
                <Header.Content>
                  <Icon name='block layout' color='grey' />
                  <Tooltip
                    content='See the products in this data collection'
                    position='bottom center'
                    trigger={<Link to={'/products?collections=' + c.id}>
                                &nbsp;
                                {c.metadata.title}
                             </Link>}
                  />
                </Header.Content>
              </Header>
              <div>

              {/* <Reveal animated='small fade'>
              <Reveal.Content visible>
                <Image src='https://react.semantic-ui.com/assets/images/wireframe/square-image.png' size='small' />
              </Reveal.Content>
              <Reveal.Content hidden>
                <Image src='https://react.semantic-ui.com/assets/images/avatar/large/ade.jpg' size='small' />
              </Reveal.Content>
            </Reveal> */}

                {c.metadata.abstract}
                {c.metadataExternalLink && this.makeExternalMetadataLinkUI(c)}
              </div>
              {config.name === 'lidar' && this.makeLicenceUI(c)}
          </Grid.Column>
          <Grid.Column width='4' verticalAlign='top'>
            <div className='spaced barely'>
              <Link to={'/products?collections=' + c.id}>
                <Button
                  content='View on Map'
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
                style={{ display: 'inline' }}
                data-size={c.data.download.size}>
                <Button
                  content='Download'
                  title='Download entire dataset'
                  color='grey'
                />
              </form>
              }
              {c.data.wms && !this.hideWmsButtonForScotland(c) &&
              <WmsModalButton
                url={c.data.wms.base_url + '?service=wms&version=1.3.0&request=GetCapabilities'}
                buttonProps={{content: 'WMS' }}
                />
              }
            </div>
            {c.data.download && c.data.download.size &&
            <div>
              <span style={{ fontSize: '.85714286rem', color: 'rgba(0,0,0,.6)', fontWeight: 'bold' }}>
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

  makeLicenceUI(c: Collection) {

    let l = getLicenceDetailsFromUseConstraints(c.metadata.useConstraints)

    return (
      <div className='licence'>
        <div>
          <a href={l.url} target='_blank' >
            {l.name} <Icon name='external' />
          </a>
        </div>
        {l.image &&
        <div>
          <a href={l.url} target='_blank' >
            <img src={require('../../images/licences/' + l.image)} width='62' height='27' />
          </a>
        </div>
        }
      </div>
    )
  }

  makeExternalMetadataLinkUI(c: Collection) {

    let linkUI =(
      <span style={{ marginLeft: '0.5em' }}>
        <a href={c.metadataExternalLink} target='_blank' style={{fontWeight: 'bold'}}>
          Metadata &nbsp;
          <Icon name='external' />
        </a>
      </span>
    )

    return (
      <Tooltip
        position='left center'
        content='More information about this data collection'
        trigger={linkUI}
      />
    )
  }

  makeLicenceLinkUI(c: Collection) {
  }

  fetchCollections() {
    this.setState((prev) => ({ pending: prev.pending + 1 }))
    fetch('/api/collections')
      .then(res => res.json()
        .then((r: GetCollectionsResult) => {
          this.setState({ collections: r.collections })
          this.setState((prev) => ({ pending: prev.pending - 1 }))
        })).catch(ex => {
          // console.log(`couldn't get data`, ex)
          this.setState((prev) => ({ pending: prev.pending - 1 }))
        })
  }

  /** LAS files for Scotland don't really have their own WMS */
  hideWmsButtonForScotland(c: Collection) {
    return config.name === 'lidar' && c.metadata.title.endsWith('LAS')
  }
}
