import * as React from 'react';
import { Popup, Button, Header, Image, Modal } from 'semantic-ui-react'

export const WmsModal = () => (
  <Modal trigger={<Button>Show Modal</Button>} dimmer='blurring'>
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' />
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <p>We've found the following gravatar image associated with your e-mail address.</p>
        <p>Is it okay to use this photo?</p>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button color='black' onClick={undefined}>Nope</Button>
      <Button positive icon='checkmark' labelPosition='right' content="Yep, that's me" onClick={undefined} />
    </Modal.Actions>
  </Modal>
);
