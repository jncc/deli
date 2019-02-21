
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Container, Button } from 'semantic-ui-react'
import { withCookies } from 'react-cookie'

import { Head } from '../shared/Head'
import { Foot } from '../shared/Foot'
import { config } from '../../config/config'

let splashText: string

function Home(props: any) {

  if (config.name === 'lidar') {
    splashText = require('./home-splash-lidar.md')
  } else if (config.name === 'eocoe') {
    splashText = require('./home-splash-eocoe.md')
  }

  let cookieConsent = !!props.cookies.get('cookieConsent') // !! convert to boolean

  return (
    <div>

      <Head pending={0} cookieBanner={!cookieConsent} />
      <Container text>
        <br />
        <div dangerouslySetInnerHTML={ {__html: splashText} } ></div>
        <br />
        <br />
        <p>
          <Link to='/collections'>
            <Button icon='chevron circle right' labelPosition='right' color='green' content='Get Started' />
          </Link>
        </p>
        <br />
      </Container>
      <Foot />
    </div>
  )
}

export default withCookies(Home)
