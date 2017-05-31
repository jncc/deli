
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
      <Container>
          {/*<a href='/'>*/}
            {/*<img className='logo' src={require('../../images/' + config.logo.name)} height={config.logo.height} width={config.logo.width} /> &nbsp;*/}
            <Link to='/'>
              <div className='logo'>
                SRSP
                <Icon name='ellipsis vertical' />
              {/*<span className='logo-strap'>Scottish Remote Sensing Portal</span>*/}
              </div>
            </Link>
          {/*</a>*/}
      </Container>
      <Spinner pending={props.pending}/>
    </div>
  )
}
