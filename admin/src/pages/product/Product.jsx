import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import "./product.css";
import { Link, useLocation } from 'react-router-dom';
import Chart from '../../components/chart/Chart';
import { Publish } from "@material-ui/icons";
import { useSelector } from 'react-redux';
import { publicRequest, userRequest } from '../../requestMethods';

function Product() {

    const location = useLocation();
    const productId = location.pathname.split("/home")[2];
    const [pStats, setPStats] = useState([]);

    const pro = useSelector((state) => state.product.products.find((product) => product._id === productId))
    
    const [product,setProduct]=useState(pro)

    
    
   

    const [pname, setPname] = useState(pname);
    const [price, setPrice] = useState(price);
    const [desc, setDesc] = useState(desc);
    const [size, setSize] = useState([]);
    const [stock, setStock] = useState(true);
    const [cat, setCat] = useState(cat);


    useEffect(()=>{
        let sString = '';
        product.size.map((item) => {
            sString += (item) + ','
        });
        sString = sString.slice(0, -1);
        setSize(sString);
    },[product])

    const updateProduct = async (e) => {
        e.preventDefault();

        var arr = size.split(',');
        try {
            const res = await publicRequest.put(`/products/${productId}`, {
                title: pname,
                price: price,
                desc: desc,
                size: arr,
                inStock: stock,
                categories: cat,
            });

            if (res) {

                setProduct(res.data)

                let sString = '';
                product.size.map((item) => {
                    sString += (item) + ','
                });
                sString = sString.slice(0, -1);
                setSize(sString)

                alert("Product has been Updated");
                window.location.reload();
            }
        } catch (e) {
            console.log(e);
        }
    }

    const getProducts = async () => {
        const res = await publicRequest.get(`/products/find/${productId}`);
        if (res) setProduct(res.data);
    }

    useEffect(() => {
        getProducts();
    }, [])


    // let sizeString = '';
    // product.map((item) => {
    //     sizeString += (item) + ','
    // });
    // sizeString = sizeString.slice(0, -1);


    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "OCt",
            "Nov",
            "Dec",
        ],
        []
    )

    


    useEffect(() => {
        setPStats([{name:MONTHS[3],"Sales":500}]);
    //     const getStats = async () => {
    //         console.log("lolaa",pStats)
    //         try {
    //             // const res = await userRequest.get("orders/income?pid=" + productId)
    //             const res=await userRequest.get(`orders/income/${productId}`);
    //             const list = res.data.sort((a, b) => {
    //                 return a._id - b._id
    //             })
    //             list.map((item) =>
    //                 setPStats((prev) => [
    //                     ...prev, { name: MONTHS[item._id - 1], Sales: item.total },
    //                 ])
    //             )
    //         } catch (e) {
    //             console.log(e)
    //         }
    //     }
        // getStats();
    }, [productId, MONTHS])

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                
                    {/* <Chart data={pStats} dataKey="Sales" grid title="Sales Performance" /> */}
                    <Chart data={pStats} title="Sales Performance" grid dataKey="Sales" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product.img} alt="" className="productInfoImg" />
                        <span className="productName">{product.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span className="productInfoValue">{product._id}</span>
                        </div>
                        {/* <div className="productInfoItem">
                            <span className="productInfoKey">sales:</span>
                            <span className="productInfoValue">513</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">inStock:</span>
                            <span className="productInfoValue">{product.inStock ? product.inStock : "YES"}</span>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form onSubmit={updateProduct} className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input type="text" placeholder={product.title} onChange={(e) => { setPname(e.target.value) }} />
                        <label>Product Description</label>
                        <input type='text' placeholder={product.desc} onChange={(e) => { setDesc(e.target.value) }} />
                        <label>Product Price</label>
                        <input type='text' placeholder={product.price} onChange={(e) => { setPrice(e.target.value) }} />
                        <label>In Stock</label>
                        <select  name="inStock" id="idStock" onChange={(e) => { setStock(e.target.value) }}>
                            <option value={true} selected>Yes</option>
                            <option value={false}>No</option>
                        </select>

                        <label>Size</label>
                        <input type='text' value={size} onChange={(e) => { setSize(e.target.value) }} />

                        <label>Categories</label>
                        <input type='text' placeholder={product.categories} onChange={(e) => { setCat(e.target.value) }} />
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={product.img} alt="" className="productUploadImg" />
                            <label for="file">
                                {/* <Publish /> */}
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                        <button type='submit' className="productButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Product
