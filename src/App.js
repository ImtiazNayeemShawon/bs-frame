import React, { useState } from "react";
import Frame from "../img/frm 1.png";
import "./App.css";
import html2canvas from 'html2canvas';

export default function App() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [down, setDown] = useState(false);

  const handleImageChange = (event) => {
    setDown(true);
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

 const takeScreenshot = () => {
    html2canvas(document.body).then(function(canvas) {
      const link = document.createElement('a');
      link.download = 'screenshot.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const imagePreview =
    imagePreviewUrl === "" ? (
      <div className="">
        <img
          className="w-96 rounded m-auto block img"
          src="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
          alt="Preview"
        />
      </div>
    ) : (
      <div className="">
        <img
          className="w-96 round m-auto block img"
          src={imagePreviewUrl}
          alt="Preview"
        />
      </div>
    );

  return (
    <div className="m-auto block mt-1 m-10">
      <div className="bg m-auto block">
        <div className="img">{imagePreview}</div>
        <img className="w-96 m-auto absolute right-0 left-0 top" src={Frame} alt="frame" />
      </div>
      {down ? (
        <button
          onClick={takeScreenshot}
          className="
        m-auto block bg-gray-600 text-white p-2 rounded mt-10 font-bold max-sm:hover:text-white max-sm:hover:bg-white"
        >
          Download 
        </button>
      ) : (
        <input
          onChange={handleImageChange}
          type="file"
          className="m-auto block mt-40  max-sm:mt-80"
        />
      )}
    </div>
  );
}
