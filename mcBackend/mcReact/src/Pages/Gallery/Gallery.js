import './Gallery.css';
import axios from 'axios';
import { useState } from 'react';

const Gallery = () => {

  const [Images, setImages] = useState(Array);
  const [search, setSearch] = useState("");

  
  const downloadImage = () => {
    const url = "http://localhost:3001/download/" + String(search);
    setSearch(document.getElementById("header-search").value);

    axios({
      method: 'get',
      url: url,
    }).then((response) => {
      if(response.status === 200){
        var listOfImages = new Array();
        listOfImages = response.data;
        for(var i = 0; i < listOfImages.length; i++) {
          listOfImages[i] = "http://localhost:3001/" + listOfImages[i];
        }

        const listItems = listOfImages.map((image) =>
          <div className="responsive">
            <div className="UniqueImage">
              <a target="_blank" href={image}>
                <img className="gImage" src={image} alt={search}></img>
              </a>
            </div>
          </div>
        );

        setImages(listItems);
        document.getElementById("galleryImages").style.visibility = "visible";
      }
    });
  }
  
  return (
    <div className="gallery">
      <div className="searchbar">
        <input
          type="text"
          id="header-search"
          placeholder="Search Organism Here"
          name="s"
        />
        <button id="submitInput" type="submit" onClick={downloadImage}><i className="fa fa-search"></i></button>
      </div>
      <div id="galleryImages">
        <h1 id="searchClass">{search}</h1>
        {Images}
      </div>      
    </div>
  );
}

export default Gallery;
