
import * as React from 'react'
import { Container, Modal, Button, Header, ModalProps, Segment, Input, Label, Icon, Form, Reveal, Grid, Divider } from "semantic-ui-react";
import * as CopyToClipboard from 'react-copy-to-clipboard';
import * as _ from 'lodash';

import { Tooltip } from "../deli/Widgets";
interface WmsModalProps {
  wms: {
    base_url: string,
    name: string
  }
}

interface WmsState {
  copiedToClipboard: boolean
}

export class WmsModal extends React.Component<WmsModalProps, WmsState> {

  state = { copiedToClipboard: false }

  render() {
    return <Modal
      trigger={<Button>WMS</Button>}
      dimmer='blurring'
      header={<Header icon='cloud download' content='Get a WMS link' />}
      content={this.getContent()}
      actions={[
        { color: 'green', icon: 'checkmark', labelPosition: 'right', content: 'OK', triggerClose: true },
      ]}
    />
  }

  getContent() {

    let url = this.props.wms.base_url + '?service=wms&version=1.3.0&request=GetCapabilities' // + this.props.wms.name

    return (
      <Modal.Content>
        <Segment basic>
          <div className='spaced slightly'>
          <Label size='large'> {url} </Label>
          </div>
          <div>
            <CopyToClipboard text={url} onCopy={() => this.handleCopied()}>
                <Button icon='copy' labelPosition='right' color='pink' content='Copy to clipboard' />
            </CopyToClipboard>
            {this.state.copiedToClipboard &&
              <span><Icon name='checkmark'/>Copied! Now paste the WMS link into your GIS client</span>
            }
          </div>
        </Segment>
        <Segment basic>
          <Header>You can use this link in your GIS client</Header>
        </Segment>
        <Grid divided stackable centered columns='2'>
          <Grid.Column>
            <Header icon as='h4'>
              <Icon name='rocket' />
              See how to use WMS <a href='http://www.qgis.org/en/docs' target='_blank'>in QGIS</a>
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Header icon as='h4'>
              <Icon name='world' />
              See how to use WMS <a href='https://www.arcgis.com/features/index.html' target='_blank'>in ArcGIS</a>
            </Header>
          </Grid.Column>
        </Grid>
      </Modal.Content>
    )
  }

  handleCopied = () => {
    this.setState({ copiedToClipboard: true })
    let delayed = _.debounce(() => this.setState({ copiedToClipboard: false }), 10000)
    delayed();
  }
}


//use this to easily dev the modal
export function DevWmsModal() {
  let wms = {
    base_url: 'http://some.base/url',
    name: 'some:layer:name'
  }

  return <WmsModal wms={wms} />
}
