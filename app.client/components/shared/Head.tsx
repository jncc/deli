
import * as React from "react";
import { Container, Icon } from 'semantic-ui-react'

import { config } from "../../config";

export class Head extends React.Component<any, {}> {

  render() {
    return (
      <nav className="head">
        <Container>
            {/*<a href="/">*/}
              {/*<img className="logo" src={require('../../images/' + config.logo.name)} height={config.logo.height} width={config.logo.width} /> &nbsp;*/}
              <span className="logo-text">SRSP<Icon name="ellipsis vertical" /></span>

              <span className="logo-strap">Scottish Remote Sensing Portal</span>
            {/*</a>*/}

        </Container>
      </nav>
    );
  }
}

