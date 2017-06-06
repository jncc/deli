
import * as React from 'react'
import { Link } from "react-router-dom";
import { Container, Icon, Accordion, Segment } from 'semantic-ui-react'

import { config } from '../../config'
import { Spinner } from './Spinner'

interface HeadProps {
  pending: number
}

export const Head = (props: HeadProps) => {

  return (
    <div className='head'>
      <Container className='head-content'>
        <div className='head-logo'>
          <Link to='/'>
            SRSP
          </Link>
        </div>
        <div className='head-strap'>
          <Icon name='ellipsis vertical' />
          Scottish Remote Sensing Portal
        </div>
      </Container>
      <Spinner pending={props.pending} />
    </div>
  )
}
