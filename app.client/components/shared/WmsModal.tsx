
import * as React from 'react'
import { Container, Modal, Button, Header, ModalProps, Segment, Input, Label, Icon, Form, Reveal } from "semantic-ui-react";
import * as CopyToClipboard from 'react-copy-to-clipboard';
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
    let url = this.props.wms.base_url + '::' + this.props.wms.name

    return <Modal.Content>
      Use this WMS link in your GIS client.
      {/*<Form  >*/}
        <Form.Group inline>
          <Form.Field>
            <Label size='large'>
              {url}
            </Label>
          </Form.Field>
          <Form.Field>
            <CopyToClipboard text={url} onCopy={() => this.handleCopied()}>
                <Button icon='copy' labelPosition='right' color='pink' content='Copy to clipboard' />
            </CopyToClipboard>
          </Form.Field>
          <Form.Field>

            {this.state.copiedToClipboard && <span>Now paste the link into your GIS client.</span>}
          </Form.Field>
        </Form.Group>
      {/*</Form>*/}
      <p>
        You can use this link in <a href='http://www.qgis.org/en/docs' target='_blank'>QGIS</a> or <a href='https://www.arcgis.com/features/index.html' target='_blank'>ArcGIS</a>.
      </p>
    </Modal.Content>
  }

  handleCopied = () => {
    this.setState({ copiedToClipboard: true })
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
