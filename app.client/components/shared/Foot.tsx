
import * as React from 'react';
import { Container, Icon } from 'semantic-ui-react'
import { config } from '../../config/config'

export function Foot() {

  return (
    <div className='foot'>
      <Container>
        <span>
          Built by <a href='http://jncc.defra.gov.uk/' target='_blank'>
            JNCC
          </a> <Icon name='external' />
        </span>
        {config.name === 'lidar' &&
        <div className='feedback-link'>
          Feedback welcome <strong>gi-sat@gov.scot</strong>
        </div>
        }
      </Container>
    </div>
  );
}
