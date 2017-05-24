
import * as React from 'react'
import { Container, Icon, Progress } from 'semantic-ui-react'

import { config } from '../../config'

interface HeadProps {
  pending: number
}

export class Head extends React.Component<HeadProps, { recent: boolean}> {

  constructor(props: HeadProps) {
    super(props)
    this.state = {recent: false}
  }

  render() {
    return (
      <nav className='head'>
        <Container>
            {/*<a href='/'>*/}
              {/*<img className='logo' src={require('../../images/' + config.logo.name)} height={config.logo.height} width={config.logo.width} /> &nbsp;*/}
              <span className='logo-text'>SRSP<Icon name='ellipsis vertical' /></span>
              <span className='logo-strap'>Scottish Remote Sensing Portal</span>
            {/*</a>*/}

        </Container>
        {this.getPendingUI()}
      </nav>
    )
  }

  // componentWillUpdate(prevProps: HeadProps) {
  //   if (!this.state.recent && prevProps.pending < this.props.pending) {
  //     this.setState({ recent: true })
  //     setTimeout(() => this.setState({ recent: false }), 2000)
  //   }
  // }

  getPendingUI = () => {
    // console.log(this.props.pending + ' ' + this.state.recent)
    if (this.props.pending > 0) { // || this.state.recent
      return <Progress size='tiny' active percent={100} />
    } else {
      return <Progress size='tiny' percent={100} />
    }
  }
}
