
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Container, Modal, Button, Header, ModalProps, Segment, Input, Label, Icon, Form, Grid, Reveal, Image } from "semantic-ui-react"

import { Head } from '../shared/Head'
import { Foot } from '../shared/Foot'
import { config } from '../../config/config'

let content: string = require('./cookies.md')
// add semantic ui classes to tables
let contentToUse = content.replace(/<table>/g, '<table class="ui celled table">')

export function Cookies(props: any) {

  return (
    <div>
      <Head pending={0} />
      <Container>
        <Header
          as='h1'
          content='Cookies'
          subheader='About the cookies on this portal'>
        </Header>
        <br />

        <div dangerouslySetInnerHTML={ {__html: content } } ></div>

      </Container>
      <Foot />
    </div>
  )
}
