

import * as React from "react";
import { Link } from 'react-router-dom';

import { Header } from "../shared/Header";
import { Footer } from "../shared/Footer";
import { data } from "./data";
import { formatBytes } from "../../utility/formatBytes";

export function Collections(props: any) {

  let collectionsList = data.map(c => {
    return (
    <div className="collection">
      <div className="collection-left">
      </div>
      <div className="collection-main">
        <div className="collection-main-title"><Link to={ "/app?collections=" + c.id }>{ c.title }</Link></div>
        <div >

          <Link to={ "/app?collections=" + c.id }>{ c.title }</Link>
        </div>
      </div>
      <div className="collection-right">
            <span className="collection-right-download-type">{c.data.download.type}</span>
            <br />
            <span>{formatBytes(c.data.download.size, 0)}</span>

      </div>
      <div className="collection-right">
            <form method="get" action={c.data.download.url}>
              <button className="btn btn-default" type="submit">Download</button>
            </form>
      </div>

    </div>
    );
  });

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Collections</h1>
        <br />
        { collectionsList }
      </div>
      <Footer />
    </div>
  );
}
