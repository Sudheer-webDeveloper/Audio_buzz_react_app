import React from "react";
import { useMusicContext } from "../../Context";

const FileInput = () => {
  const { handleFileChange } = useMusicContext();

  return (
    <main className="main">
      <label htmlFor="fileInput" className="custom-file-upload">
        <input
          type="file"
          id="fileInput"
          accept="mp3"
          onChange={handleFileChange}
          multiple
          style={{ display: 'none' }}  // here i am hiding the default file input
        />
        <span className="file-select-icon" role="img" aria-label="File Icon">
          📂
        </span>
        Choose MP3 Files
      </label>
    </main>
  );
};

export default FileInput;
