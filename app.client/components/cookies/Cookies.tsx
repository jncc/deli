
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Container, Modal, Button, Header, ModalProps, Segment, Input, Label, Icon, Form, Grid, Reveal, Image } from 'semantic-ui-react'
import { withCookies } from 'react-cookie'

import { Head } from '../shared/Head'
import { Foot } from '../shared/Foot'
import { config } from '../../config/config'

let content: string = require('./cookies.md')
// add semantic ui classes to tables
let contentStyled = content.replace(/<table>/g, '<table class="ui celled table">')

function Cookies(props: any) {

  // seeing this page counts as cookie consent
  let oneYearInTheFuture = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
  props.cookies.set('cookieConsent', 'ok', { path: '/', expires: oneYearInTheFuture })

  return (
    <div>
      <Head pending={0} cookieBanner={false}  />
      <Container>
        <Header
          as='h1'
          content='Cookies'
          subheader='About the cookies on this portal'>
        </Header>
        <br />

        <div dangerouslySetInnerHTML={ {__html: contentStyled } } ></div>

        <br />
        <br />

      </Container>
      <Foot />
    </div>
  )
}

export default withCookies(Cookies)
