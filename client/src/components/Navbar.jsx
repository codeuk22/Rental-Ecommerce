import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from '@material-ui/core';
import { mobile } from "../responsive";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ExitToAppOutlined } from "@material-ui/icons"
import { getUserProducts } from '../service/productApi';
import { ShoppingBasket } from '@material-ui/icons';
import logo from "../Images/logo.png";
import { userRequest } from '../requestMethods';


const Container = styled.div`
  height:60px;
  margin-top: -25px;
  margin-bottom: 15px;
  ${mobile({ height: "50px" })}
`

const Wrapper = styled.div`
  padding:10px 20px;
  display:flex;
  /* margin-top:-2rem; */
  align-items: center;
  justify-content: space-between;

  ${mobile({ padding: "10px 0px" })}
`
const Left = styled.div`
flex: 1;
display: flex;
align-items: center;
`
const Language = styled.span`
font-size: 14px;
cursor: pointer;
${mobile({ display: "none" })}
`

const SearchContainer = styled.div`
border:0.5px solid lightgray;
display: flex;
align-items: center;
margin-left: 25px;
padding: 5px;
`
const Input = styled.input`
border: none;
${mobile({ width: "50px" })}
`

const Center = styled.div`
flex: 1;
text-align: center;
`
const Logo = styled.h1`
font-weight: bold;
/* font-size: 15px; */
${mobile({ fontSize: "24px" })}
`

const Right = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: flex-end;
${mobile({ flex: 2, justifyContent: "center" })}
`

const MenuItem = styled.div`
font-size: 14px;
cursor: pointer;
margin-left: 25px;
text-decoration: none;
${mobile({ fontSize: "12px", marginLeft: "10px" })}
`
const Button = styled.button`
background:transparent;
border:none;
font:15px;
cursor:pointer;
&:hover{
  color: blue;
}
`
const TopButton = styled.button`
padding: 10px;
font-weight: 600;
cursor: pointer;
`

const Navbar = ({length}) => {

  const q = useSelector(state => state.cart.quantity);
  const navigate = useNavigate();

  const [len, setLength] = useState();
  const [quantity, setQuantity] = useState();
  const [userId,setUserId]=useState();
  const [data, setData] = useState();

  const id=JSON.parse(localStorage.getItem("user"))?.username;


  useEffect(() => {
    const getProductData = async () => {
      const data = await getUserProducts(id);
      setLength(data?.length);
      setQuantity(data?.length);
    };
    getProductData();
  }, []);


  // const getProductItem = async () => {
  //   console.log("cc",userId)

  //   const data = await getUserProducts(userId);
  //   console.log("pup",data)
  //   setLength(data?.length);
  //   setQuantity(data?.length);
  // }

  const handleOrder = () => {
    navigate("/orders");
  }


  useEffect(() => {
    getSetuser();
  }, [])

  useEffect(() => {
    setQuantity(length)
  }, [length, quantity])


  const getSetuser = () => {
    const user = localStorage.getItem("user")
    setData(user)
  }
  const handleClick = () => {
    localStorage.clear();
    setQuantity(0);
    navigate('/')
    getSetuser();
  }
  const handleCart = () => {
    if (!data) {
      navigate("/login")
    }
    else {
      navigate("/cart")
    }
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/">
            <Language><img src={logo} alt="" style={{ width: "70px", height: "70px" }} /></Language>
          </Link>
          {/* <SearchContainer> */}
          {/* <Input placeholder="Search" /> */}
          {/* <Search style={{ color: "gray", fontSize: 16 }} /> */}

          {/* </SearchContainer> */}
          {/* <button onClick={handleSearch}>Search </button> */}
        </Left>
        <Center>
          <Logo>Bharat Mall</Logo>
        </Center>
        <Right>
          {data && <ShoppingBasket style={{ cursor: "pointer" }} onClick={handleOrder} />}

          <button style={{ background: "transparent", border: "none" }} onClick={handleCart}>
            <MenuItem>
              {data ?
                <Badge badgeContent={len} overlap="rectangular" color="primary">
                  <ShoppingCartOutlined />
                </Badge> :
                <Badge badgeContent={null} overlap="rectangular" color="primary">
                  <ShoppingCartOutlined />
                </Badge>

              }
            </MenuItem>
          </button>
          {
            !data ? <>
              <Link to="/register" className='link'>
                <MenuItem><p>Register</p></MenuItem>
              </Link>
              <Link to="/login">
                <MenuItem>Sign In</MenuItem>
              </Link>
            </> : <Button onClick={handleClick}> <ExitToAppOutlined /> </Button>
          }
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar;
