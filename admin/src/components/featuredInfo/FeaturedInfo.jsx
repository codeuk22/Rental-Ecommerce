import React, { useEffect, useState } from 'react'
import "./featuredInfo.css"
import {ArrowDownward, ArrowUpward} from "@material-ui/icons";
import { publicRequest, userRequest } from '../../requestMethods';

function FeaturedInfo() {

  const [income,setIncome]=useState(0);
  const [perc,setPerc]=useState(0);
  const [val,setVal]=useState(0);

  useEffect(()=>{
    const getIncome=async ()=>{
      try{
        // const res=await userRequest.get("/orders/income")
        const res=await userRequest.get("/orders");
        const users=await userRequest.get("/users");
        const product =await publicRequest.get("/products");
        let a=0;

        for(let i=0;i<res.data.length;i++) a+=res.data[i].amount;
        setIncome(a);
        a=0;
        for(let i=0;i<product.data.length;i++) if(product.data[i].inStock===true) a+=product.data[i].price;
        setVal(a);
        setPerc(users.data.length);
        // setPerc(res.data[1].total*100/res.data[0].total-100);
      }catch(e){
        console.log(e);
      }
    }
    getIncome();
  },[])


  return (
    <>
    <div className='featured'>
      <div className='featuredItem'>
        <span className='featuredTitle'>Active Users</span>
        <div className="featuredMoneyContainer">
            {/* <span className='featuredMoney'>{`$`} {income[1]?.total}</span> */}
            {/* <span className='featuredMoneyRate'>
            {Math.floor(perc)}%{" "}
            {perc<0 ? (
            <ArrowDownward className='featuredIcon negative'/> 
            ):<ArrowUpward className='featuredIcon'/> }</span> */}
            <span className='featuredMoneyRate'>{perc}</span>
        </div>
        {/* <span className="featuredSub">Active Users of this Month</span> */}
      </div>
      <div className='featuredItem'>
        <span className='featuredTitle'>Sales</span>
        <div className="featuredMoneyContainer">
            <span className='featuredMoney'>₹ {income}</span>
            <span className='featuredMoneyRate'><ArrowUpward className='featuredIcon'/> </span>
        </div>
        {/* <span className="featuredSub">Sales of this Month</span> */}
      </div>
      <div className='featuredItem'>
        <span className='featuredTitle'>Valuation of Available Product</span>
        <div className="featuredMoneyContainer">
            <span className='featuredMoney'>₹ {val}</span>
            {/* <span className='featuredMoneyRate'><ArrowUpward className='featuredIcon'/> </span> */}
        </div>
        <span className="featuredSub"></span>
      </div>
    </div>
    </>
  )
}

export default FeaturedInfo
