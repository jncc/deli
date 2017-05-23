
import * as React from "react";
import { Container, Icon, Progress } from 'semantic-ui-react'

import { config } from "../../config";

interface HeadProps {
  pending: number;
}


export class Head extends React.Component<HeadProps, {}> {

  render() {
    return (
      <nav className="head">
        <Container>
            {/*<a href="/">*/}
              {/*<img className="logo" src={require('../../images/' + config.logo.name)} height={config.logo.height} width={config.logo.width} /> &nbsp;*/}
              <span className="logo-text">SRSP<Icon name="ellipsis vertical" /></span>
              <span className="logo-strap">Scottish Remote Sensing Portal</span>
            {/*</a>*/}

          {getWaitingUI()}
        </Container>
      </nav>
    );
  }

  componentDidUpdate(prevProps: HeadProps) {

    if (prevProps.waiting != this.props.waiting) {
        //this.state.spinning = true;
    }
  }

  getWaitingUI = () => {
    if (this.spinning) {
      return <Progress percent={0} />
    }
  };
}
