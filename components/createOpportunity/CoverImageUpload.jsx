import React, { useState } from "react";
import { ImageUpload } from "../forms/ImageUpload";

export default function CoverImageUpload() {
  return (
    <>
      <div className="relative h-full">
        <ImageUpload
          className={`relative w-full h-[200px] border border-gray-300 rounded-lg border-dashed flex items-center justify-center`}
        />

        <ImageUpload
          className={`absolute -bottom-20 left-20 w-[128px] h-[128px] border border-gray-300 rounded-lg border-dashed flex items-center justify-center`}
        />
      </div>
    </>
  );
}
