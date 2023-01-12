import "./App.css";
// import useLocalStorage from "react-use-localstorage";
import { useState } from "react";

export default function ImageUpload(props) {
  // on app start load data URL in base64 image string format from local storage
  const [imageURL, setImageURL] = useState(localStorage.getItem(props.imgID));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imageURL) {
      setImageURL(imageURL);
      localStorage.setItem(props.imgID, imageURL)
    }
  };

  const showImage = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // read file as data url in base64 format and save it to the current imageURL state
      let reader = new FileReader();
      reader.onload = function () {
        setImageURL(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const deleteImage = () => {
    localStorage.removeItem(props.imgID);
    setImageURL();
  };

  return (
    <div className="imgUploadContainer">
      {imageURL && (
        <div className="imgContainer">
          <img className="img" src={imageURL} alt=""></img>
        </div>
      )}
      <form className="imgUpload" onSubmit={handleSubmit}>
          <label>Choose image: </label>
          <input type="file" onChange={showImage} />
        <button className="btn primary" type="submit">Save to local storage</button>
        <button className="btn" onClick={deleteImage}>Delete image</button>
      </form>
    </div>
  );
}
