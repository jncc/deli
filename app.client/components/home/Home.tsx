
import * as React from "react";
import { Link } from 'react-router-dom';

import { Head } from "../shared/Head";
import { Foot } from "../shared/Foot";

let splashText = require("./home-splash.md");

export function Home(props: any) {

  return (
    <div>
      <Head pending={0} />
      <div className="container" >
        <div dangerouslySetInnerHTML={ {__html: splashText} } ></div>
        <br />
        <br />
        <p><Link to="/collections" className="btn btn-primary">Get Started</Link></p>
        <br />
      </div>
      <Foot />
    </div>
  );
}

