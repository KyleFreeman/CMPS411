import './Gallery.css';
import axios from 'axios';
import { useState } from 'react';

const Gallery = () => {

  const [Images, setImages] = useState(null);

  const downloadImage = async () => {
      var search = document.getElementById("header-search").value;
      const url = "http://localhost:3001/download/" + String(search);

      const response = await axios({
        method: 'get',
        url: url,
      });

      if(response.status === 200){
        var listOfImages = new Array();
        listOfImages = response.data;
        for(var i = 0; i < listOfImages.length; i++) {
          listOfImages[i] = "http://localhost:3001/" + listOfImages[i];
        }

        const listItems = listOfImages.map((image) =>
          <img className="gImage" src={image} alt={search}></img>
        );

        setImages(listItems);
      }
  }
  
  return (
    <div className="gallery">
      <div className="searchbar">
        <label htmlFor="header-search">
          <span className="hidden">Search </span>
        </label>
        <input
          type="text"
          id="header-search"
          placeholder="Organism Name"
          name="s"
        />
        <button type="submit" onClick={downloadImage} /*onClick="document.getElementById('gImages').style.visibility = visible;"*/ >Search</button>
      </div>
      <ul id="galleryImages">{Images}</ul>      
    </div>
  );
}

export default Gallery;
