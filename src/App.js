import React, { Component } from 'react';
import { MovieLensSearch } from './Components/MovieLensSearch'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backend_status: 'pre-check'
    }

  }

  render() {
    return (
      <div>
        <MovieLensSearch />
        <div className='footer'>
          Server status: {this.state.backend_status}
        </div>
      </div>
    );
  }

  componentDidMount() {
    fetch('/api/v1/healthcheck').then((res) => {
      return res.json();
    }).then((res) => {
      this.setState({'backend_status': res['status']});
    }).catch((err) => {
      this.setState({err});
    });
  }
}

export default App;
