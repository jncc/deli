
import * as React from "react";
import { Link } from 'react-router-dom';

import { Header } from "../shared/Header";

export function Home(props: any) {

  return (
    <div>
      <Header />
      <div className="container" >
        <h1>Welcome</h1>
        <p>Let's <Link to="/collections">get started</Link>.</p>
      </div>
    </div>
  );
}

