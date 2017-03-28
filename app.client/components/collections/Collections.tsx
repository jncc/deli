

import * as React from "react";
import { Link } from 'react-router-dom';

import { Header } from "../shared/Header";
import { data } from "./data";

export function Collections(props: any) {

  let rows = data.map(c => {
    return (
    <li>
        <Link to={ "/app?collections=" + c.id }>{ c.title }</Link>
    </li>
    );
  });

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Collections</h1>
        <ul>
          { rows }
        </ul>
      </div>
    </div>
  );
}
