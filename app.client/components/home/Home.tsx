
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from "semantic-ui-react";

import { Head } from '../shared/Head';
import { Foot } from '../shared/Foot';

let splashText = require('./home-splash.md');

export function Home(props: any) {

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
        <br />
      </Container>
      <Foot />
    </div>
  );
}
