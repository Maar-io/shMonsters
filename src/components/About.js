import React, { Component } from 'react'
import  Alert  from 'react-bootstrap/Alert';

export default class About extends Component {

    render() {
        console.log("call About component");
        return (
            <>
            <div>
                <Alert variant='info' size="large">
                    <h4>Add your project!</h4>
                    <p>
                        If you want your project to be visible on this site, add to your repository's description
          any combination of tags you see in the search form (on Github tags called topics). Below is the example of description with topics.
                </p>
                </Alert>
                <div className="container">
        <div className="row">
          {/* <div className="col text-center">
          <Image src={example} rounded />
          </div> */}
        </div>
      </div>
            </div>
            </>
        )
    }
}
