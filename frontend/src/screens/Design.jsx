import React, { useState, useRef, useEffect } from 'react';
import { SketchPicker } from 'react-color';

const Design = () => {
  const [imageData, setImageData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [logoData, setLogoData] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const [logoPosition, setLogoPosition] = useState({ x: 50, y: 50 });
  const [logoWidth, setLogoWidth] = useState(50); // Initial width of the logo
  const [logoHeight, setLogoHeight] = useState(50);
  const [gender, setGender] = useState('');
  const [dressSize, setDressSize] = useState('');
  const [color, setColor] = useState({ r: 255, g: 255, b: 255 });
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(25);
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50});
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [savePrompt, setSavePrompt] = useState(false);

  const canvasRef = useRef(null);
  const isDraggingRef = useRef(false);
  const prevMousePositionRef = useRef({ x: 0, y: 0 });
  const draggingItemRef = useRef(null);


  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (imageData) {
      const image = new Image();
      image.src = imageData;
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0);
        if (logoImage) {
          const logoImg = new Image();
          logoImg.src = logoImage;
          logoImg.onload = () => {
            ctx.drawImage(logoImg, logoPosition.x, logoPosition.y, logoWidth, logoHeight);
          };
        }
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
        ctx.fillText(text, textPosition.x, textPosition.y);
      };
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [imageData, logoImage, logoPosition, logoWidth, logoHeight, color, text, fontSize, textPosition]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setImageData(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  const handleLogoChange = (event) => {
    setLogoData(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setLogoImage(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleSave = () => {
    if (selectedFile) {
      setSavePrompt(true);
      console.log("Image uploaded")
    } else {
      console.log("No image uploaded.");
    }
  };

  const confirmSave = () => {
    setSavePrompt(false);
    setSaveSuccess(true);
    console.log("Gender:", gender);
    console.log("Size:", dressSize);
    console.log("Text Color:", color);
    console.log("Text:", text);
    console.log("Font Size:", fontSize);
    console.log("Save image:", canvasRef.current.toDataURL());
  };

  const handleCancelSave = () => {
    setSavePrompt(false);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    setDressSize(''); 
  };

  const handleDressSizeChange = (event) => {
    setDressSize(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(parseInt(event.target.value));
  };
  const handleLogoWidthChange = (event) => {
    setLogoWidth(parseInt(event.target.value));
  }; 
  const handleLogoHeightChange = (event) => {
    setLogoHeight(parseInt(event.target.value));
  };

  const handleColorChange = (newColor) => {
    setColor(newColor.rgb);
  };

  const handleMouseDown = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
  
    // Check if the mouse is within the bounds of the text
    if (
      mouseX >= textPosition.x &&
      mouseX <= textPosition.x + (text.length * fontSize * 0.6) &&
      mouseY >= textPosition.y - fontSize &&
      mouseY <= textPosition.y
    ) {
      isDraggingRef.current = true;
      draggingItemRef.current = 'text';
    } else {
      // Check if the mouse is within the bounds of the logo
      if (
        mouseX >= logoPosition.x &&
        mouseX <= logoPosition.x + logoWidth &&
        mouseY >= logoPosition.y &&
        mouseY <= logoPosition.y + logoHeight
      ) {
        isDraggingRef.current = true;
        draggingItemRef.current = 'logo';
      }
    }
  
    prevMousePositionRef.current = {
      x: event.clientX,
      y: event.clientY
    };
  };
  const handleMouseMove = (event) => {
    if (isDraggingRef.current) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const dx = event.clientX - prevMousePositionRef.current.x;
      const dy = event.clientY - prevMousePositionRef.current.y;
      if (draggingItemRef.current === 'text') {
        setTextPosition({
          x: textPosition.x + dx,
          y: textPosition.y + dy
        });
      } else if (draggingItemRef.current === 'logo') {
        setLogoPosition({
          x: logoPosition.x + dx,
          y: logoPosition.y + dy
        });
      }
      prevMousePositionRef.current = {
        x: event.clientX,
        y: event.clientY
      };
    }
  };
  const handleMouseUp = () => {
    isDraggingRef.current = false;
    draggingItemRef.current=null;
  };

  const sizeStyles = {
    Male_S: { width: '150px', height: '200px' },
    Male_M: { width: '200px', height: '250px' },
    Male_L: { width: '250px', height: '300px' },
    Male_XL: {width:'350px', height:'400px'},
    
    Female_XS: { width: '120px', height: '180px' },
    Female_S: { width: '140px', height: '200px' },
    Female_M: { width: '160px', height: '220px' },
    Female_L: { width: '180px', height: '240px' },
    Female_XL: {width:'350px', height:'400px'},
  };

  return (
    <div className="w-screen h-screen bg-red-200 md-flex  justify-center items-center">
      <div className="text-center text-3xl text-red-500 pb-10">Customise Your Dress!!!</div>
      <div className="flex flex-col items-center">
        <canvas 
          ref={canvasRef} 
          style={{ ...sizeStyles[dressSize], maxWidth: '100%', height: 'auto', marginBottom: '1rem' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        ></canvas>
        <input type="file" onChange={handleFileChange} className="py-2 px-4 border rounded-lg bg-white" />
        <select value={gender} onChange={handleGenderChange} className="mt-4 px-4 py-2 border rounded-lg bg-white">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {gender && (
          <select value={dressSize} onChange={handleDressSizeChange} className="mt-2 px-4 py-2 border rounded-lg bg-white">
            <option value="">Select Size</option>
            {gender === 'Male' && (
              <>
                <option value="Male_S">S</option>
                <option value="Male_M">M</option>
                <option value="Male_L">L</option>
                <option value="Male_XL">XL</option>
              </>
            )}
            {gender === 'Female' && (
              <>
                <option value="Female_XS">XS</option>
                <option value="Female_S">S</option>
                <option value="Female_M">M</option>
                <option value="Female_L">L</option>
                <option value="Female_XL">XL</option>
              </>
            )}
          </select>
        )}
        <input type="file" onChange={handleLogoChange} className="py-2 px-4 border rounded-lg bg-white mt-4" />
        <button onClick={() => {setLogoWidth(logoWidth+10);setLogoHeight(logoHeight + 10);}} style={{ backgroundColor: 'white', color: 'black' ,borderRadius:'10px', padding:'5px 8px', cursor:'pointer',marginTop: '10px'}}>Increase Size</button>
        
        <button onClick={() => {setLogoWidth(logoWidth -10);setLogoHeight(logoHeight- 10);}} style={{ backgroundColor: 'white', color: 'black' ,borderRadius:'10px', padding:'5px 8px', cursor:'pointer', marginTop:'10px',}}>Decrease Size</button>
        <input 
          type="text" 
          value={text} 
          onChange={handleTextChange} 
          placeholder="Enter text" 
          className="py-2 px-4 border rounded-lg bg-white mt-4" 
        />
        <input 
          type="number" 
          value={fontSize} 
          onChange={handleFontSizeChange} 
          placeholder="Enter font size" 
          className="py-2 px-4 border rounded-lg bg-white mt-2" 
        />
        <SketchPicker 
          color={color} 
          onChange={handleColorChange} 
          className="mt-2" 
        />

        <button onClick={handleSave} className="mt-4 bg-orange-300 text-white px-6 py-2 rounded-md hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-green-300">
          Save
        </button>
        {savePrompt && (
          <div className="mt-4">
            <p>Are you sure you want to save?</p>
            <button onClick={confirmSave} className="bg-green-400 text-white px-4 py-2 rounded-md mr-2">Yes</button>
            <button onClick={handleCancelSave} className="bg-red-400 text-white px-4 py-2 rounded-md">No</button>
          </div>
        )}
        {saveSuccess && (
          <div className="mt-4 text-green-400">Saved successfully!</div>
        )}
      </div>
    </div>
  );
};

export default Design;


