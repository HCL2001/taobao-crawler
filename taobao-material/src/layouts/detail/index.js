import { Typography, Divider, Paper, Container, Grid, IconButton, Modal} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "assets/api/api";
import ReactImageMagnify from 'react-image-magnify';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import axios from "axios";

const DetailPage = () => {
  const [productInfo, setProductInfo] = useState(null);
  const [data, setData] = useState([]);
  const authToken = JSON.parse(JSON.stringify(localStorage.getItem("token")));
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [zoomedImageVisible, setZoomedImageVisible] = useState(false);
  const [selectedSku, setSelectedSku] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const fetchProductInfo = async () => {
    try {
      // const token = localStorage.getItem("token");
      // console.log("hieu" + token);
      // if (!token) {
      //   console.error("Token not found in local storage");
      //   return;
      // }

      const headers = new Headers({
        // Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      });

      const options = {
        method: "GET",
        headers: headers,
      };

      const response = await fetch(`${API_BASE_URL}/product_detail?n_id=726085758711`, options);
      const data = await response.json();
      console.log("data", JSON.stringify(data));

      setProductInfo(data);
    } catch (error) {
      console.error("Error fetching product info:", error);
    }
  };

  useEffect(() => {
    fetchProductInfo();
  }, []);

   // Ensure productInfo is loaded before rendering
   if (!productInfo) {
    return <Typography>Loading...</Typography>;
  }

  const mainImgs = productInfo && JSON.parse(productInfo.main_imgs);
  const originPrice = productInfo && productInfo.skus[0].origin_price;
  const salePrice = productInfo && productInfo.skus[0].sale_price;
  const productName = productInfo && productInfo.name;
  const stock = productInfo && productInfo.skus[0].stock;

  const productNameStyle = {
    minHeight: '21px',
    _height: '21px',
    fontSize: '18px',
    fontWeight: '700',
    lineHeight: '21px',
    color: '#3C3C3C',
  };

  const handleShowSku = (skuIndex) => {
    if (productInfo && productInfo.skus && productInfo.skus.length > skuIndex) {
      setSelectedSku(productInfo.skus[skuIndex]);
    }
  };

  // Function to open image in a new window
  const openImageInNewWindow = (imageUrl) => {
    const newWindow = window.open(imageUrl, 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  return (
    <DashboardLayout>
      <Container>
        <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={5}>
            {mainImgs && mainImgs.length > 0 && mainImgs[activeImageIndex] && (
              <div
                style={{ position: 'relative' }}
                onMouseEnter={() => setZoomedImageVisible(true)}
                onMouseLeave={() => setZoomedImageVisible(false)}
                onClick={() => toggleModal()} // Toggle the modal on image click
              >
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: `Main Image ${activeImageIndex + 1}`,
                      width: 400,
                      src: mainImgs[activeImageIndex],
                      height: 500,
                    },
                    largeImage: {
                      src: mainImgs[activeImageIndex],
                      width: 1000, // Adjust width as needed
                      height: 1500, // Fixed height of 500 pixels
                    },
                    lensStyle: { borderColor: 'blue' }, // Adjust styling as needed
                    lensProps: { borderRadius: 50 }, // Adjust styling as needed
                    shouldUsePositiveSpaceLens: true,
                  }}
                >
                <div style={{ height: '500px' }}>
                    <img
                      src={mainImgs[activeImageIndex].src}
                      alt={`Main Image ${activeImageIndex + 1}`}
                      style={{ width: '100%', height: '100%' }}
                    />
                </div>
                </ReactImageMagnify>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', width: '400px' }}>
              {mainImgs && mainImgs.length > 0 && (
                <ul className="thumbnail-list" style={{ listStyleType: 'none', padding: 0, display: 'flex' }}>
                  {mainImgs.map((img, index) => (
                    <li
                      key={index}
                      onMouseEnter={() => setActiveImageIndex(index)}
                      style={{
                        marginRight: '10px',
                        border: activeImageIndex === index ? '2px solid blue' : 'none',
                      }}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        style={{
                          maxWidth: '50px',
                          maxHeight: '50px',
                          width: 'auto',
                          height: 'auto',
                        }}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            </Grid>
            <Grid item xs={12} sm={7}>
              {/* Product Information */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="product-info">
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      {productName && (
                        <Typography
                          variant="h6"
                          color="textPrimary"
                          style={productNameStyle}
                        >
                          {productName}
                        </Typography>
                      )}
                      <Divider sx={{ marginY: 1 }} />
                    </Grid>
                  </Grid>
                </div>
                <div
                  className="product-prices"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "#FFF2E8",
                    padding: "10px",
                    borderRadius: "8px", // Adding rounded corners
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Adding a subtle shadow
                  }}
                >
                  <div style={{ marginRight: "20px" }}>
                    <Typography variant="body2" color="textSecondary" style={{ fontSize: '18px', color: 'rgb(60, 60, 60)', fontWeight: 400 }}>
                      <strong>Original Price:</strong>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ fontSize: '18px', color: 'rgb(60, 60, 60)', fontWeight: 400 }}>
                      <strong>Sale Price:</strong>
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body2" color="textSecondary" style={{ fontSize: '13px', color: 'rgb(60, 60, 60)', fontWeight: 400, textDecoration: 'line-through' }}>
                      ¥{originPrice}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{
                        fontSize: '20px',
                        fontWeight: 400,
                        fontFamily: 'Tahoma, Arial, Helvetica, sans-serif',
                        color: '#F40'
                      }}
                    >
                      ¥{salePrice}
                    </Typography>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    {/* New paragraph */}
                    <p style={{ fontSize: '18px', color: 'rgb(60, 60, 60)', fontWeight: 400 }}>
                      {stock}+ in store
                    </p>
                  </div>
                </div>
                <div className="product-quantity" style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                  <label htmlFor="quantityInput" style={{ marginRight: '10px' }}>Quantity: </label>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #EAEAEA', borderRadius: '4px' }}>
                    <button
                      style={{
                        padding: '5px 10px',
                        fontSize: '16px',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: '#EAEAEA',
                        borderRadius: '4px 0 0 4px',
                      }}
                      onClick={() => {
                        if (quantity > 1) {
                          setQuantity(quantity - 1);
                        }
                      }}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantityInput"
                      value={quantity}
                      onKeyDown={(e) => {
                        if (e.key === 'e' || e.key === 'E') {
                          e.preventDefault(); // Prevent entering the "e" key
                        }
                      }}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        if (!isNaN(value) && value >= 1 && value <= stock) {
                          setQuantity(value);
                        } else if (isNaN(value) || value < 1) {
                          setQuantity(1);
                        } else if (value > stock) {
                          setQuantity(stock);
                        }
                      }}
                      min="1"
                      style={{
                        width: '40px',
                        padding: '5px',
                        textAlign: 'center',
                        border: 'none',
                        borderLeft: '1px solid #EAEAEA',
                        MozAppearance: 'textfield', // For Firefox
                        borderRight: '1px solid #EAEAEA',
                        '::-webkit-inner-spin-button': 'none', // Remove spin button in WebKit browsers
                        '::-webkit-outer-spin-button': 'none', // Remove spin button in WebKit browsers
                        '-moz-appearance': 'textfield', // For Firefox
                      }}
                    />
                    <button
                      style={{
                        padding: '5px 10px',
                        fontSize: '16px',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: '#EAEAEA',
                        borderRadius: '0 4px 4px 0',
                      }}
                      onClick={() => {
                        if (quantity < stock) {
                          setQuantity(quantity + 1);
                        }
                      }}
                      disabled={quantity >= stock}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="product-action-buttons" style={{ display: 'flex', gap: '10px', padding: '10px' }}>
                  <button
                    style={{
                      padding: '10px 20px',
                      fontSize: '16px',
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: '#EAEAEA',
                      borderRadius: '4px',
                    }}
                    onClick={() => handleAddToCart()}
                  >
                    Add to Cart
                  </button>
                  <button
                    style={{
                      padding: '10px 20px',
                      fontSize: '16px',
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: '#F40',
                      color: '#FFF',
                      borderRadius: '4px',
                    }}
                    onClick={() => handleBuyNow()}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Container>
{/* Modal */}
      <Modal
        open={modalOpen}
        onClose={toggleModal}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} // Center content
      >
        <div
          style={{
            display: 'flex',
            background: 'white', // Set background color to white
            borderRadius: '8px', // Add rounded corners
            maxWidth: '80%', // Set maximum width
            maxHeight: '80vh', // Set maximum height
            overflow: 'auto', // Enable scrolling if content overflows
          }}
        >
          {/* Left side with image */}
          <div style={{ flex: 8, padding: '20px' }}>
            {/* Display your main image */}
            {mainImgs && mainImgs.length > 0 && (
              <img
                src={mainImgs[activeImageIndex]}
                alt={`Main Image ${activeImageIndex + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            )}
          </div>
          
          {/* Right side with product name and list */}
          <div style={{ flex: 2, padding: '20px', borderLeft: '1px solid #ccc', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IconButton
              onClick={toggleModal}
              style={{ position: 'absolute', top: 10, right: 10 }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <h2 style={{fontSize: '18px'}}>{productName}</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'row', gap: '10px' }}>
              {/* List of additional images */}
              {mainImgs && mainImgs.length > 0 &&
                mainImgs.map((img, index) => (
                  <li
                    key={index}
                    onClick={() => setActiveImageIndex(index)} // Update the main image on click
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={img} alt={`Additional Image ${index + 1}`} height={'50px'} />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default DetailPage;