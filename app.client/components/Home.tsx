
import * as React from "react";
import { Link } from 'react-router-dom';



export function Home(props: any) {

  return (
    <div>
      <h1>Welcome to the thing...!.</h1>
      <p>Let's go to the <Link to="/app">app</Link>!</p>
    </div>
  );
}
