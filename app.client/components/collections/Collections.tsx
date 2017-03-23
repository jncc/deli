

import * as React from "react";
import { Link } from 'react-router-dom';

import { Header } from "../shared/Header";

export function Collections(props: any) {

  return (
    <div>
      <Header />
      <div className="container" >
        <h1>Collections</h1>
        <p><Link to={"/app?collections=s2-ard"}>S2-ARD</Link></p>
      </div>
    </div>
  );
}
