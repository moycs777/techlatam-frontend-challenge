import React, { Component } from 'react';

// url form itunes api
const api = 'https://itunes.apple.com/us/rss/topalbums/limit=10/json';

class Album extends Component {

    constructor(props) {
        super(props);

        // variables needed for the app
        this.state = {
            entries:[],
            isLoading:false,
            error:false
        };
    }

    componentDidMount() {
        // using loading text
        this.setState({ isLoading:true });
        fetch(api)
            .then( res => {
                if (res.ok) {
                    return res.json();
                }else{
                    throw new Error("something went wrong");
                }
            })
            .then( (data) => {
                // the calling is done so we cancel the loading text
                console.log("api data: " + JSON.stringify(data.feed.entry[1]['im:image'][0].label ));
                this.setState({ isLoading:false, entries:data.feed.entry})
            })
            .catch(err=> this.setState({isLoading:false}));
    } 
    render() {
        const { entries, isLoading, error } = this.state;
        var styles = {
            width: '18rem',
            /* color: 'red',
            backgroundColor: 'black',
            fontWeight: 'bold' */
        };
      if (error) {
          return <p>{error.message}</p>;    
      }
      if (isLoading) {
          return <p>Loading ...</p>;
      }
      return (
         	<div class="container">
				
				<div className="row">

					<h3>albums</h3>

				</div>

            	<div className="row">

                    {entries.map(album =>
                      <div className="col-md-4">

                          <div className="card" style={styles} key={album.title.label}>

                              <img className="card-img-top" src={album['im:image'][0].label} alt={album['im:image'][0].label} />

                              <div className="card-body">

                                  <h5 className="card-title">Artist: {album['im:artist'].label}.</h5>

                                  <p className="card-text">Genre: {album.category.attributes.label}.</p>

                                  <a href={album.link.attributes.href} className="btn btn-primary" target="_blank">{album.title.label}. </a>

                              </div>

                          </div>

                      </div>
                    )}

				</div>

			</div>
      );
    }

    
}

export default Album;
