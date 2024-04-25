import { useState, useRef, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import { useNavigate } from 'react-router-dom';
import Navbar from "../component/Navbar.jsx";

const Design = () => {


    const navigate = useNavigate();

    useEffect(() => getProfile, []);


    const getProfile = async () => {
      const res = await fetch("http://localhost:3000/api/profile", {
          method: "GET",
          credentials: "include"
        }
        );
      const data = await res.json();

      if (res.status != 200){
        navigate("/login");

      }}



  const colorPalatte = {r:255,g:255,b:255};
  const [imageData, setImageData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [logoData, setLogoData] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const [logoPosition, setLogoPosition] = useState({ x: 50, y: 50 });
  const [logoWidth, setLogoWidth] = useState(500); // Initial width of the logo
  const [logoHeight, setLogoHeight] = useState(500);
  const [gender, setGender] = useState('');
  const [dressSize, setDressSize] = useState('');
  const [textColor, setTextColor] = useState(colorPalatte);
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(50);
  const [fontStyle,setFontStyle] = useState('');
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50});
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [savePrompt, setSavePrompt] = useState(false);
  const [dressColor,setDressColor] = useState(colorPalatte);

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

        if (dressColor.r !== 255 || dressColor.g !== 255 || dressColor.b !== 255) {
          const imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
          const data = imageData.data;
        

        for (let i=0; i< data.length; i+=4) {
          data[i] = dressColor.r;
          data[i+1] = dressColor.g;
          data[i+2] = dressColor.b;
        }

        ctx.putImageData(imageData,0,0);
      }
        if (logoImage) {
          const logoImg = new Image();
          logoImg.src = logoImage;
          logoImg.onload = () => {
            ctx.drawImage(logoImg, logoPosition.x, logoPosition.y, logoWidth, logoHeight);
          };
        }
        ctx.font = `${fontSize}px ${fontStyle}`;

        const forTextColor = `rgb(${textColor.r}, ${textColor.g}, ${textColor.b})`;
        ctx.fillStyle = forTextColor;
        ctx.fillText(text, textPosition.x, textPosition.y);


      };
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [imageData, logoImage, logoPosition, logoWidth, logoHeight, textColor, text, fontSize, textPosition, dressColor, fontStyle]);

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

  // Save Dress
  const handleSave = async () => {
    if (selectedFile) {
      setSavePrompt(true);
      console.log("Image uploaded");

      const res = await fetch("http://localhost:3000/api/savedress", {
        method: "POST",
        credentials: "include",
        headers: {"Content-type": "application/x-www-form-urlencoded"},
        body: new URLSearchParams({
          'dress': canvasRef.current.toDataURL()
        })
      }
      
      );
    } else {
      console.log("No image uploaded.");
    }
  };

  const confirmSave = () => {
    setSavePrompt(false);
    setSaveSuccess(true);
    console.log("Gender:", gender);
    console.log("Size:", dressSize);
    console.log("Text Color:", textColor);
    console.log("Text:", text);
    console.log("Dress Color:",dressColor);
    console.log("Font Size:", fontSize);
    console.log("Font Style:",fontStyle);
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

  const handleDressColorChange = (newDressColor) => {
    setDressColor(newDressColor.rgb);
  }



  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(parseInt(event.target.value));
  };

  const handleFontStyleChange = (event) => {
    setFontStyle(event.target.value); 
  };

  const handleLogoWidthChange = (event) => {
    setLogoWidth(parseInt(event.target.value));
  }; 
  const handleLogoHeightChange = (event) => {
    setLogoHeight(parseInt(event.target.value));
  };

  const handleTextColorChange = (newTextColor) => {
    setTextColor(newTextColor.rgb);
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




  return (
    <div>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-r from-amber-200 to-pink-200 flex justify-center items-center">
      <div className=" bg-white rounded-lg shadow-lg shadow-black p-9 max-w-6xl w-full">
        <div className="text-center text-4xl font-bold text-amber-500 mb-8">
          Customize Your Dress
        </div>

        <div className="flex flex-col md:flex-row md:items-center">

          <div className="md:w-1/3 md:mr-8 ">
            <canvas
              ref={canvasRef}
              style={{
                
                maxWidth: '100%',
                height: '100%',
                marginBottom: '1rem',
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              className="shadow-lg rounded-lg mx-auto shadow-black"
            />
          </div>

          <div className="md:w-1/2">
            <div className="flex flex-col md:flex-row md:items-center font-bold text-lg text-amber-500 ">
                <div className="px-4 py-2 md:ml-4 mt-4">
                  Upload Image 
                </div>
                <div className="px-4 py-2 md:ml-2 mt-4">
                  
                </div>
                <div className="px-4 py-2 md:ml-20 mt-4">
                  Upload Logo 
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <input
                type="file"
                
                onChange={handleFileChange}
                className="py-2 px-4 border rounded-lg bg-amber-100 mt-4 md:mr-4 focus:outline-none focus:ring-3 focus:ring-amber-500"
              />

              <input
                type="file"
                onChange={handleLogoChange}
                className="mt-4 px-4 py-2 border rounded-lg bg-amber-100 md:mx-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />  
              


            </div>

            <div className="flex items-center  mb-4">
              <select
                  value={gender}
                  onChange={handleGenderChange}
                  className="mt-4 px-4 py-2 border rounded-lg bg-amber-100 md:mx-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {gender && (
                  <select
                    value={dressSize}
                    onChange={handleDressSizeChange}
                    className="mt-4 px-4 py-2 border rounded-lg bg-amber-100 md:mx-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
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
            </div>

            <div className="flex items-center mb-4">

              <button
                onClick={() => {
                  setLogoWidth(logoWidth + 10);
                  setLogoHeight(logoHeight + 10);
                }}
                className="bg-amber-500 text-white rounded-lg px-4 py-2 mr-2 hover:bg-amber-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                Increase Size
              </button>
              <button
                onClick={() => {
                  setLogoWidth(logoWidth - 10);
                  setLogoHeight(logoHeight - 10);
                }}
                className="bg-amber-500 text-white rounded-lg px-4 py-2 mr-2 hover:bg-amber-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                Decrease Size
              </button>
            </div>

            <input
              type="text"
              value={text}
              onChange={handleTextChange}
              placeholder="Enter text"
              className="py-2 px-4 border rounded-lg bg-amber-100 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <div className="flex flex-col md:flex-row mb-4">
              <select
                value={fontStyle}
                onChange={handleFontStyleChange}
                className="px-4 py-2 border rounded-lg bg-amber-100 md:mr-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Verdana">Verdana</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
                <option value="Tahoma">Tahoma</option>
                <option value="Trebuchet MS">Trebuchet MS</option>
                <option value="Comic Sans MS">Comic Sans MS</option>
              </select>
              <input
                type="number"
                value={fontSize}
                onChange={handleFontSizeChange}
                placeholder="Enter font size"
                className="py-2 px-4 border rounded-lg bg-amber-100 mt-2 md:mt-0 md:ml-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
              <SketchPicker
                color={textColor}
                onChange={handleTextColorChange}
                className="shadow-lg rounded-lg"
              />
              <SketchPicker
                color={dressColor}
                onChange={handleDressColorChange}
                className="shadow-lg rounded-lg"
              />
            </div>

            <button
              onClick={handleSave}
              className="mt-4 bg-amber-500 text-white px-6 py-2 rounded-md hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-colors duration-300"
            >
              Save
            </button>

            {savePrompt && (
              <div className="mt-4 flex items-center justify-center">
                <p className="mr-4">Are you sure you want to save?</p>
                <button
                  onClick={confirmSave}
                  className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  Yes
                </button>
                <button
                  onClick={handleCancelSave}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  No
                </button>
              </div>
            )}

            {saveSuccess && (
              <div className="mt-4 text-green-500 font:bold text-center">Saved successfully!</div>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Design;

