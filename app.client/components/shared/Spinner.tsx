
import * as React from 'react'
import { Progress } from 'semantic-ui-react'
import * as _ from 'lodash';

interface SpinnerProps {
  pending: number
}

interface SpinnerState {
  spinning: boolean
}

export class Spinner extends React.Component<SpinnerProps, SpinnerState> {

  // make sure we don't stop the progress bar too quickly
  stopTheSpinner = _.debounce(() => this.setState({ spinning: false }), 1000)

  constructor(props: SpinnerProps) {
    super(props)
    this.state = { spinning: false }
  }

  componentWillReceiveProps(nextProps: SpinnerProps) {
    if (nextProps.pending > this.props.pending) {
      this.setState({ spinning: true })
    } else {
      this.stopTheSpinner()
    }
  }

  render() {
    return <Progress id='progress' size='tiny' active={this.state.spinning} percent={100} />
  }
}
