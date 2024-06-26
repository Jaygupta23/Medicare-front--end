import React, { useState, useEffect } from 'react';
import Layout from '../../component/Layout/Layout';
import AdminMenu from '../../component/Layout/AdminMenu';
import { tostE, tostS } from '../../toast/Toast';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CreateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState(null);

    const navigate = useNavigate();

    // Fetch all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.error(error);
            tostE(error.response?.data?.message || 'Error fetching categories');
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("category", category);
            productData.append("shipping", shipping);

            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`, productData);
            if (data?.success) {
                tostS("Product created successfully");
                navigate('/dashboard/admin/products');
            } else {
                tostE(data?.message);
            }
        } catch (error) {
            console.error(error);
            tostE(error.response?.data?.message || 'Error creating product');
        }
    }

    return (
        <Layout title={"Dashboard - Create Product"}>
            <div style={{ marginTop: "7rem" }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3 px-5">
                            <AdminMenu />
                        </div>
                        <div className="col-md-9 px-5">
                            <h1>Create Product</h1>
                            <div className="m-1 w-100 w-md-75">
                                <Select
                                    bordered={false}
                                    placeholder="Select a category"
                                    size='large'
                                    showSearch
                                    className='form-select mb-3'
                                    onChange={(value) => setCategory(value)}
                                >
                                    {categories.map((c) => (
                                        <Option key={c._id} value={c._id}>
                                            {c.name}
                                        </Option>
                                    ))}
                                </Select>
                                <div className="mb-3">
                                    <label className='btn btn-outline-success col-12 py-2`'>
                                        {photo ? photo.name : "Upload Photo"}
                                        <input 
                                            type="file" 
                                            name='photo' 
                                            accept='image/*' 
                                            onChange={(e) => setPhoto(e.target.files[0])} 
                                            hidden 
                                        />
                                    </label>
                                </div>
                                <div className="mb-3">
                                    {photo && (
                                        <div className="text-center">
                                            <img 
                                                src={URL.createObjectURL(photo)} 
                                                alt="product-pic" 
                                                height={'200px'} 
                                                className='img img-responsive' 
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <input 
                                        type="text" 
                                        value={name} 
                                        placeholder='Write a name' 
                                        className='form-control' 
                                        onChange={(e) => setName(e.target.value)} 
                                    />
                                </div>
                                <div className="mb-3">
                                    <textarea 
                                        value={description} 
                                        placeholder='Write a description' 
                                        className='form-control' 
                                        onChange={(e) => setDescription(e.target.value)} 
                                    />
                                </div>
                                <div className="mb-3">
                                    <input 
                                        type="number" 
                                        value={price} 
                                        placeholder='Write a price' 
                                        className='form-control' 
                                        onChange={(e) => setPrice(e.target.value)} 
                                    />
                                </div>
                                <div className="mb-3">
                                    <input 
                                        type="number" 
                                        value={quantity} 
                                        placeholder='Write a quantity' 
                                        className='form-control' 
                                        onChange={(e) => setQuantity(e.target.value)} 
                                    />
                                </div>
                                <div className="mb-3">
                                    <Select 
                                        bordered={false} 
                                        placeholder="Select Shipping" 
                                        size='large' 
                                        showSearch 
                                        className='form-select mb-3' 
                                        onChange={(value) => setShipping(value)}
                                    >
                                        <Option value="0">No</Option>
                                        <Option value="1">Yes</Option>
                                    </Select>
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-success" onClick={handleCreate}>CREATE PRODUCT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CreateProduct;
