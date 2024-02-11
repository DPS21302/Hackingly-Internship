import { Image } from "lucide-react";
import { useDropzone } from "react-dropzone";

export const ImageUpload = ({
    imageType,
    selectedImage,
    onImageSelected,
    onImageUpload,
    className,
  }) => {
    const { getRootProps, getInputProps, open } = useDropzone({
      accept: {
        "image/png": [".png"],
        "image/jpeg": [".jpg", ".jpeg"],
      },
      noClick: true,
      noKeyboard: true,
      onDrop: (acceptedFiles) => {
        const fileUrl = URL.createObjectURL(acceptedFiles[0]);
        onImageSelected(fileUrl);
        console.log(`Image selected for ${imageType}`);
      },
    });
  
    const handleImageUpload = () => {
      // Trigger the parent component's image upload function
      onImageUpload();
    };
    return (
      <div
        {...getRootProps({ className: "dropzone" })}
        onClick={open}
        className={`${className}`}
      >
        <input {...getInputProps()} />
        {selectedImage ? (
          <>
            <img
              src={selectedImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          </>
        ) : (
          <Image className="text-primary" />
        )}
        <button onClick={handleImageUpload}>Upload Image</button>
      </div>
    );
  };