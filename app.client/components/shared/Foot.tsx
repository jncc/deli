
import * as React from 'react';

import { Container } from 'semantic-ui-react'

export function Foot() {

  return (
    <div className='foot'>
      <Container>
        <span>Built by <a href='http://jncc.defra.gov.uk/' target='_blank'>JNCC
            <span className='glyphicon glyphicon-share link-glypicon'></span>
          </a>
        </span>
      </Container>
    </div>
  );
}
