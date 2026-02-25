import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    }

    const Add_Product = async () => {
        console.log(productDetails);
        let responseData;
        let product = productDetails;
        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:4100/upload', {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: formData,
        }).then((resp) => resp.json()).then((data) => { responseData = data });

        if (responseData.success) {
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:4100/addproduct', {
                method: 'POST',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            }).then((resp) => resp.json()).then((data) => {
                data.success ? alert("Product Added Successfully") : alert("Failed to add product");
            });
        }
    }

    return (
        <div className="add-product">
            <h1 className="add-product-title">Add New Product</h1>
            <p className="add-product-subtitle">Fill in the details below to list a new item</p>
            <div className="add-product-divider"></div>

            <div className="add-product-itemfield">
                <p>Product Title</p>
                <input
                    value={productDetails.name}
                    onChange={changeHandler}
                    type="text"
                    name='name'
                    placeholder='e.g. Silk Wrap Dress'
                />
            </div>

            <div className="add-product-price">
                <div className="add-product-itemfield">
                    <p>Original Price</p>
                    <input
                        value={productDetails.old_price}
                        onChange={changeHandler}
                        type="text"
                        name='old_price'
                        placeholder='$0.00'
                    />
                </div>
                <div className="add-product-itemfield">
                    <p>Sale Price</p>
                    <input
                        value={productDetails.new_price}
                        onChange={changeHandler}
                        type="text"
                        name='new_price'
                        placeholder='$0.00'
                    />
                </div>
            </div>

            <div className="add-product-itemfield">
                <p>Category</p>
                <select
                    value={productDetails.category}
                    onChange={changeHandler}
                    name="category"
                    className='add-product-selector'
                >
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kids</option>
                </select>
            </div>

            <div className="add-product-itemfield">
                <p>Product Image</p>
                <label htmlFor="file-input">
                    <div className="add-product-upload-area">
                        {image
                            ? <img src={URL.createObjectURL(image)} className='add-product-thumnail-img' alt="Preview" />
                            : <>
                                <img src={upload_area} alt="Upload" style={{ width: 48, opacity: 0.4 }} />
                                <p className="add-product-upload-text">
                                    <strong>Click to upload</strong> or drag & drop<br />
                                    PNG, JPG, WEBP up to 10MB
                                </p>
                            </>
                        }
                    </div>
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>

            <button onClick={Add_Product} className='add-product-btn'>Publish Product</button>
        </div>
    )
}

export default AddProduct