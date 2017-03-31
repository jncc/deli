
import * as React from "react";
import { Link } from 'react-router-dom';

import { Header } from "../shared/Header";
import { Footer } from "../shared/Footer";

let splashText = require("./home-splash.md");

export function Home(props: any) {

  return (
    <div>
      <Header />
      <div className="container" >
        <div dangerouslySetInnerHTML={ {__html: splashText} } ></div>
        <br />
        <br />
        <p><Link to="/collections" className="btn btn-primary">Get Started</Link></p>
        <br />
      </div>
      <Footer />
    </div>
  );
}

