

import * as React from "react";
import { Link } from 'react-router-dom';

import { Header } from "../shared/Header";
import { Footer } from "../shared/Footer";
import { formatBytes } from "../../utility/formatBytes";
import { Collection, GetCollectionsResult } from "../../../app.server/handlers/collections/models"

interface CollectionsState {
  collections: Collection[];
}

export class Collections extends React.Component<any, CollectionsState> {

  constructor(props: any) {
    super(props);
    this.state = { collections: new Array() };
  }

  componentDidMount() {
    this.fetchCollections();
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <h1>Collections</h1>
          <br />
          { this.makeCollectionsListUI() }
        </div>
        <Footer />
      </div>
    );
  }

  makeCollectionsListUI() {
    return this.state.collections.map(c => {
      return (
        <div className="collection">
          <div className="collection-left">
          </div>
          <div className="collection-main">
            <div className="collection-main-title">
              <Link to={"/app?collections=" + c.id}>
                {c.metadata.title}
              </Link>
            </div>
            <div >
              {c.metadata.abstract}
              <span className="collection-main-more-info">
                <a href="https://www.spatialdata.gov.scot/geonetwork/srv/eng/catalog.search#/metadata/92367c84-74d3-4426-8b0f-6f4a8096f593" target="_blank">
                  More information &nbsp;
                  <span className="glyphicon glyphicon-share"></span>
                </a>
              </span>

            <div className="collection-main-visualise">
              <Link className="btn btn-danger"
                  to={"/app?collections=" + c.id}
                  title={"Visualise " + c.metadata.title}>
                <span className="btn-glyphicon glyphicon glyphicon-circle-arrow-right"></span>
                Visualise
              </Link>
            </div>



            </div>
          </div>
          <div className="collection-right">
            <span className="collection-right-download-type">{c.data.download.type}</span>
            <br />
            <span>{ formatBytes(c.data.download.size, 0) }</span>
          </div>
          <div className="collection-right">
            <form method="get" action={c.data.download.url}>
              <button className="btn btn-default" type="submit" title="Download entire dataset">
                <span className="btn-glyphicon glyphicon glyphicon-download-alt"></span>
                Download
              </button>
            </form>
          </div>
          <div className="collection-right">
            <form method="get" action={c.data.wms.base_url + '/' + c.data.wms.name}>
              <button className="btn btn-primary" type="submit">WMS</button>
            </form>
          </div>
        </div>
      );
    });
  }

  fetchCollections() {
    fetch('/api/collections')
      .then(res => res.json()
        .then((r: GetCollectionsResult) => {
          this.setState({ collections: r.collections });
        })).catch(ex => {
          console.log(`couldn't get data`, ex);
        });
  }

}
