import React, { useState, useRef, useEffect } from 'react';

const Design = () => {
  const [imageData, setImageData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [gender, setGender] = useState('');
  const [dressSize, setDressSize] = useState('');
  const [color, setColor] = useState({ r: 255, g: 255, b: 255 }); // Initial color: white
  const [text, setText] = useState(''); // State for the text entered by the user
  const [saveSuccess, setSaveSuccess] = useState(false); // State for save success

  const canvasRef = useRef(null);

  useEffect(() => {
    if (imageData) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const image = new Image();
      image.src = imageData;
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0);

        ctx.font = "30px Arial";
        ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
        ctx.fillText(text, 10, 50);
      };
    }
  }, [imageData, color, text]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setImageData(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleSave = () => {
    if (selectedFile) {
      console.log("Gender:", gender);
      console.log("Dress Size:", dressSize);
      console.log("Color:", color);
      console.log("Text:", text);
      console.log("Save image:", canvasRef.current.toDataURL());

      setTimeout(() => {
        setSaveSuccess(true);
        console.log("Saved successfully");
      }, 1000);
    } else {
      console.log("No image selected.");
    }
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    setDressSize(''); 
  };

  const handleDressSizeChange = (event) => {
    setDressSize(event.target.value);
  };

  const handleColorChange = (event) => {
    const { name, value } = event.target;
    setColor({ ...color, [name]: parseInt(value) });
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };


  const sizeStyles = {
    Small: { width: '150px', height: '200px' },
    Medium: { width: '200px', height: '250px' },
    Large: { width: '250px', height: '300px' },
    XS: { width: '120px', height: '180px' },
    S: { width: '140px', height: '200px' },
    M: { width: '160px', height: '220px' },
    L: { width: '180px', height: '240px' },
    XL: { width: '200px', height: '260px' },
    Custom: { width: '200px', height: '200px' }, // Adjust as needed
  };

  return (
    <div className="w-screen h-screen bg-blue-200 flex flex-col justify-center items-center">
      <div className="text-center text-3xl text-red-500 pb-10">View Designs</div>
      <div className="flex flex-col items-center">
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        {imageData && (
          <div>
            <img src={imageData} alt="Uploaded" style={{ ...(sizeStyles[dressSize] || {}), maxWidth: '100%', height: 'auto', marginBottom: '1rem' }} />
          </div>
        )}
        <div className="flex flex-col items-center">
          <input type="file" onChange={handleFileChange} className="py-2 px-4 border rounded-lg bg-white" />
          <select value={gender} onChange={handleGenderChange} className="mt-4 px-4 py-2 border rounded-lg bg-white">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {gender && (
            <select value={dressSize} onChange={handleDressSizeChange} className="mt-2 px-4 py-2 border rounded-lg bg-white">
              <option value="">Select Dress Size</option>
              {gender === 'Male' && (
                <>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </>
              )}
              {gender === 'Female' && (
                <>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </>
              )}
              {gender === 'Other' && (
                <>
                  <option value="Custom">Custom</option>
                </>
              )}
            </select>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center mt-4">
        <input type="text" value={text} onChange={handleTextChange} placeholder="Enter text" className="py-2 px-4 border rounded-lg bg-white" />
        <button onClick={handleSave} className="mt-4 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
          Save
        </button>
      </div>
      <div className="mt-4">
        <input type="range" min="0" max="255" name="r" value={color.r} onChange={handleColorChange} />
        <input type="range" min="0" max="255" name="g" value={color.g} onChange={handleColorChange} />
        <input type="range" min="0" max="255" name="b" value={color.b} onChange={handleColorChange} />
      </div>
    </div>
  );
};

export default Design;



