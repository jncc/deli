
import * as React from 'react'
import { Link } from "react-router-dom";
import { Container, Icon, Accordion, Segment } from 'semantic-ui-react'

import { config } from '../../config/config'
import { Spinner } from './Spinner'

interface HeadProps {
  pending: number
}

export const Head = (props: HeadProps) => {

  return (
    <div className='head'>
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
