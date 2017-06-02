
import * as React from 'react'
import { Container, Modal, Button, Header, ModalProps, Segment, Input, Label, Icon, Form, Reveal, Grid, Divider } from "semantic-ui-react";
import * as CopyToClipboard from 'react-copy-to-clipboard';
import * as _ from 'lodash';

import { Tooltip } from "../deli/Widgets";
interface WmsModalProps {
  wms: {
    base_url: string,
    name: string
  },
  initiallyOpen?: boolean // helpful at dev time
}

interface WmsModalState {
  copiedToClipboard: boolean
}

export class WmsModalButton extends React.Component<WmsModalProps, WmsModalState> {

  state = { copiedToClipboard: false }
  resetCopiedToClipboardState = _.debounce(() => this.setState({ copiedToClipboard: false }), 10000)

  render() {
    return <Modal
      trigger={<Button>WMS</Button>}
      dimmer='blurring'
      header={<Header icon='cloud download'
      content='Get a WMS link' />}
      content={this.getContent()}
      actions={[
        { color: 'green', icon: 'checkmark', labelPosition: 'right', content: 'OK', triggerClose: true },
      ]}
      open={this.props.initiallyOpen}
    />
  }

  getContent() {

    let url = this.props.wms.base_url + '?service=wms&version=1.3.0&request=GetCapabilities'

    return (
      <Modal.Content>
        <Segment basic>
          <div className='spaced slightly'>
          <Label size='large'><Icon name='cloud download' /> {url} </Label>
          </div>
          <div>
            <CopyToClipboard text={url} onCopy={() => this.handleCopiedToClipboard()}>
                <Button icon='copy' labelPosition='right' color='pink' content='Copy to clipboard' />
            </CopyToClipboard>
            {this.state.copiedToClipboard &&
              <span><Icon name='checkmark'/>Copied! Now paste the WMS link into your GIS client</span>
            }
          </div>
        </Segment>
        <Segment basic>
          <Header textAlign='center' as='h3'>You can use this link in your GIS client</Header>
        </Segment>
        <Grid divided stackable centered columns='2'>
          <Grid.Column>
            <Header icon as='h4'>
              <Icon name='rocket' />
              How to use WMS <a href='http://www.qgis.org/en/docs' target='_blank'>in QGIS</a>
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Header icon as='h4'>
              <Icon name='world' />
              How to use WMS <a href='https://www.arcgis.com/features/index.html' target='_blank'>in ArcGIS</a>
            </Header>
          </Grid.Column>
        </Grid>
      </Modal.Content>
    )
  }

  handleCopiedToClipboard = () => {
    this.setState({ copiedToClipboard: true })
    this.resetCopiedToClipboardState()
  }
}


// use this to easily dev the modal
export function DevWmsModalButton() {
  let wms = {
    base_url: 'http://some.base/url',
    name: 'some:layer:name'
  }

  return <WmsModalButton initiallyOpen wms={wms} />
}
