import styled from "styled-components";
import StripeCheckout from "react-stripe-checkout";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../requestMethods";
import { useNavigate } from "react-router";
import React from "react";
import logo from "../../../client/src/Images/logo.png";

const SummaryBox = styled.div`
flex: 1;
border: 0.5px solid lightgray;
border-radius: 10px;
padding: 20px;
height: 50vh;
`
const SummaryTitle = styled.h1`
font-weight: 200;
`
const SummaryItem = styled.div`
margin: 30px 0px;
display: flex;
justify-content: space-between;
font-weight: ${props => props.type === "total" && "500"};
font-size: ${props => props.type === "total" && "24px"};
`
const SummaryItemText = styled.span``

const SummaryItemPrice = styled.span``

const Button = styled.button`
width: 100%;
padding: 10px;
background-color: black;
color: white;
font-weight: 600;
cursor: pointer;
`

const KEY = process.env.REACT_APP_STRIPE;

const Summary = ({ totalPrice, productList,user }) => {

    const cart = useSelector(state => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const history = useNavigate();

    const onToken = (token) => {
        setStripeToken(token);
    };

    const id=JSON.parse(localStorage.getItem("user")).username;


    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post("/checkout/payment",
                    {
                        tokenId: stripeToken.id,
                        amount: (totalPrice * 100) / 81.73,
                    });
                    
                if (res) {
                    for (let i = 0; i < productList?.length; i++) {
                        try {
                            const res=await publicRequest.post("/orders", {

                                userId:id,
                                products: [
                                    {
                                        productId: productList[i].productId,
                                    },
                                    {
                                        quantity: productList[i].quantity,
                                    }],
                                amount: productList[i].pricePerItem*productList[i].quantity,
                                status: "Success"
                            })
                            
                        } catch (e) {
                            console.log("Error while ordering ",e.message)
                        }

                    }
                    const resp=await publicRequest.delete(`/carts/find/${id}`);

                    if(resp) history("/success");
                    
                }
            } catch (e) {
                console.log(e);
            }

        };
        stripeToken && makeRequest();
    }, [stripeToken, totalPrice, history]);


    return (
        <SummaryBox>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
                <SummaryItemText>SubTotal</SummaryItemText>
                <SummaryItemPrice>₹ {totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>₹ {totalPrice*0.1}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>- ₹ {totalPrice*0.1}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
                <SummaryItemText >Total</SummaryItemText>
                <SummaryItemPrice>₹ {totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
                name="Bharat Mall"
                image={logo}
                billingAddress
                shippingAddress
                description={`Your total is  ₹ ${ totalPrice}`}
                amount={Math.round((totalPrice*100)/82.40)}
                token={onToken}
                stripeKey={KEY}
            >
                <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
        </SummaryBox>

    )
}

export default Summary;