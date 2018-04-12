import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar.js';

class Album extends Component {
   constructor(props) {
      super(props);

      // retrieve the matching album object and assign it to an album variable based on the url parameter -> album.slug
      const album = albumData.find(album => {
         return album.slug === this.props.match.params.slug
      });

      this.state = {
         album: album,
         currentSong: album.songs[0],
         isPlaying: false
      };

      // we are assigning audioElement to 'this', and not state because we need to access
      // the audio element from within class methods. its wont be displayed on the DOM directly.
      this.audioElement = document.createElement('audio');
      this.audioElement.src = album.songs[0].audioSrc;
   }

   play() {
      this.audioElement.play();
      this.setState({ isPlaying: true });
   }

   pause() {
      this.audioElement.pause();
      this.setState({ isPlaying: false })
   }

   setSong(song) {
      this.audioElement.src = song.audioSrc;
      this.setState({ currentSong: song });
   }

   // create a method and save a variable named isSameSong that is true if
   // the user clicked on the current song, an false otherwise.
   handleSongClick(song) {
      const isSameSong = this.state.currentSong === song;
      if (this.state.isPlaying === true && isSameSong) {
         this.pause();
      } else {
         if (!isSameSong) { this.setSong(song); }
         this.play();
      }
   }

   handlePrevClick() {
      // call findIndex on the album's songs array. If this.state.currentSong is equal to the song being passed into it, make that the the currentIndex.
      const currentIndex = this.state.album.songs.findIndex( song => this.state.currentSong === song) ;
      const newIndex = Math.max(0, currentIndex -1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play(newSong);
   }

   render() {
      return (
         <section className="album">
            <section id="album-info">
               <div className="album-details">
                  <img id="album-cover-art" src={this.state.album.albumCover}/>
                  <h1 id="album-title">{this.state.album.title}</h1>
                  <h2 className="artist">{this.state.album.artist}</h2>
                  <div id="release-info">{this.state.album.releaseInfo}</div>
               </div>
            </section>
            <table id="song-list">
               <colgroup>
                  <col id="song-number-column" />
                  <col id="song-title-column" />
                  <col id="song-duration-column" />
               </colgroup>
               <tbody>
                  {
                     // Loop through album songs.
                     // onClick call this.handleSongClick and pass in (song).
                     this.state.album.songs.map( (song,index) =>
                        <tr className="song" key={index} onClick={() => this.handleSongClick(song)} >
                           <td className="song-actions">
                              <button>
                                 <span className="song-number">{index+1}</span>
                                 <span className="ion-play"></span>
                                 <span className="ion-pause"></span>
                              </button>
                           </td>
                           <td className="song-title">{song.title}</td>
                           <td className="song-duration">{song.duration}</td>
                        </tr>
                     )
                  }
               </tbody>
            </table>
            <PlayerBar
               isPlaying={this.state.isPlaying}
               currentSong={this.state.currentSong}
               handleSongClick={() => this.handleSongClick(this.state.currentSong)}
               handlePrevClick={() => this.handlePrevClick()}
             />
         </section>
      );
   }
}

export default Album;
