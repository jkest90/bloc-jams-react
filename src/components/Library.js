import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
   constructor(props) {
      super(props);
      this.state = { albums: albumData };
   }


// 1) Declare the route in App.js using the URL parameter 'path=/album/:slug'
// 2) Map through the albumData array and use Link to pass in album.slug as our URL parameter.
// 3) When we click on either album, it uses this.state.albums.slug as the new URL parameter, taking us to a new page.

   render() {
      return (
         <section className='library'>
            {
               this.state.albums.map( (album, index) =>
                  <Link to={`/album/${album.slug}`} key={index}>
                     <img src={album.albumCover} alt={album.title} />
                     <div>{album.title}</div>
                     <div>{album.artist}</div>
                     <div>{album.songs.length} songs</div>
                  </Link>
               )
            }
         </section>
      );
   }
}

export default Library;
