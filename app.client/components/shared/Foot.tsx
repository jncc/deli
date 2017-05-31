
import * as React from 'react';

import { Container, Icon, Segment } from 'semantic-ui-react'

export function Foot() {

  return (
    <div className='foot'>
      <Container>
        <span>
          Built by <a href='http://jncc.defra.gov.uk/' target='_blank'>
            JNCC
          </a> <Icon name='external' />
        </span>
      </Container>
    </div>
  );
}
