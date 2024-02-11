"use client";
import React, { useCallback, useState } from "react";
import ReactEasyCrop from "react-easy-crop";

const AppPage = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropImage = async () => {
   
    // const canvas = document.createElement('canvas');
    // const scaleX = image.naturalWidth / image.width;
    // const scaleY = image.naturalHeight / image.height;
    // canvas.width = croppedAreaPixels.width;
    // canvas.height = croppedAreaPixels.height;
    // const ctx = canvas.getContext('2d');
    // ctx.drawImage(
    //   image,
    //   croppedAreaPixels.x * scaleX,
    //   croppedAreaPixels.y * scaleY,
    //   croppedAreaPixels.width * scaleX,
    //   croppedAreaPixels.height * scaleY,
    //   0,
    //   0,
    //   croppedAreaPixels.width,
    //   croppedAreaPixels.height
    // );
    // const croppedImageUrl = canvas.toDataURL('image/jpeg');
    // setCroppedImage(croppedImageUrl);
  };

  return (
    <div className="p-28 border">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {image && (
        <div className="bottom-[80px] z-50 h-40 w-40">
          <ReactEasyCrop
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            classes={{ containerClassName: "container" }}
            className="border h-40 w-40"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
          <button onClick={handleCropImage}>Crop Image</button>
        </div>
      )}
      {croppedImage && (
        <img src={croppedImage} alt="Cropped" className="mt-4" />
      )}
    </div>
  );
};

export default AppPage;
