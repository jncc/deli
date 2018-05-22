
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Container, Header } from "semantic-ui-react"

import { Head } from '../shared/Head'
import { Foot } from '../shared/Foot'

let content: string = require('./privacy.md')

export function Privacy() {

  return (
    <div>
      <Head pending={0} cookieBanner={false}  />
      <Container>
        <Header
          as='h1'
          content='Privacy'
          subheader='About your privacy on this portal'>
        </Header>
        <br />

        <div dangerouslySetInnerHTML={ {__html: content } } ></div>

        <br />
        <br />

      </Container>
      <Foot />
    </div>
  )
}
