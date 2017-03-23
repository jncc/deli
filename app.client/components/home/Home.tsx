
import * as React from "react";
import { Link } from 'react-router-dom';

import { Header } from "../shared/Header";

let splashText = require("./home-splash.md");

export function Home(props: any) {

  return (
    <div>
      <Header />
      <div className="container" >
        <div dangerouslySetInnerHTML={ {__html: splashText} } ></div>
        <p>Let's <Link to="/collections">get started</Link>.</p>
      </div>
    </div>
  );
}

