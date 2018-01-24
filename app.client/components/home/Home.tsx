
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from "semantic-ui-react";

import { Head } from '../shared/Head';
import { Foot } from '../shared/Foot';
import { config } from '../../config/config'

let splashText: string;

export function Home(props: any) {

  if (config.name === 'lidar') {
    splashText = require('./home-splash-lidar.md')
  } else if (config.name === 'eocoe') {
    splashText = require('./home-splash-eocoe.md')
  }

  return (
    <div>
      <Head pending={0} />
      <Container text>
        <br />
        <div dangerouslySetInnerHTML={ {__html: splashText} } ></div>
        <br />
        <br />
        {/*<p><Button to='/collections'  >Get Started</Button></p>*/}
        <p>
          <Link to='/collections'>
            <Button icon='chevron circle right' labelPosition='right' color='green' content='Get Started' />
          </Link>
        </p>
        <span className='minor-text'>
          By starting, you consent to receive cookies on your device to help make this website better.
        </span>
        <br />
        <br />
      </Container>
      <Foot />
    </div>
  );
}
