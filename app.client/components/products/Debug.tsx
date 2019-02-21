
import * as React from 'react'

import { Query } from '../models/Query'

interface DebugProps {
  query: Query
}

export function Debug(props: DebugProps) {

  return <div>{JSON.stringify(props.query)}</div>

}
