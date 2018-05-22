
import * as React from 'react';
import { Link } from 'react-router-dom';
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
          <span>
            <Link to='/cookies'>Cookies</Link>
          </span>
          <span>
            <Link to='/privacy'>Privacy</Link>
          </span>
          {config.name === 'lidar' &&
          <span className='feedback-link'>
            Feedback welcome. <a href="mailto:gi-sat@gov.scot">gi-sat@gov.scot</a>
          </span>
          }

      </Container>
    </div>
  );
}
