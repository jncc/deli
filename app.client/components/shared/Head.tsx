
import * as React from 'react'
import { Link } from "react-router-dom";
import { Container, Icon, Accordion, Segment, Transition } from 'semantic-ui-react'

import { config } from '../../config/config'
import { Spinner } from './Spinner'

interface HeadProps {
  pending: number,
  cookieBanner: boolean
}

export const Head = (props: HeadProps) => {

  return (
    <div className='head'>

      <Transition.Group animation='fade' duration={500}>
        {props.cookieBanner &&
          <div className="cookie-banner">
            <Container>
              We use cookies to make this site simpler. &nbsp; <Link to='/cookies'>Find out more about cookies</Link>
            </Container>
          </div>
        }
      </Transition.Group>

      {getHeaderUI()}
      <Spinner pending={props.pending} />
    </div>
  )
}

function getHeaderUI() {
  switch (config.name) {
    case 'lidar': return getLidarHeaderUI()
    case 'eocoe': return getEocoeHeaderUI()
  }
}

function getEocoeHeaderUI() {
  return (
    <Container className='head-content'>
      <div className='head-logo'>
        <Link to='/'>
          <Icon name='globe' />
        </Link>
      </div>
      <div className='head-strap'>
        Earth Observation Collaboration Node
      </div>
    </Container>
  )
}

function getLidarHeaderUI() {
  return (
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
  )
}
