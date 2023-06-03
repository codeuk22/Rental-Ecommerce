import React, { useEffect, useState } from 'react'
import "./widgetLg.css";
import { userRequest } from "../../requestMethods";
import ReactTimeAgo from 'react-time-ago';
import { formatDistanceToNow } from 'date-fns';

function WidgetLg() {

    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await userRequest.get("/orders");
                const reversedData = res.data.reverse();
                setOrders(reversedData);
            } catch (e) {
                console.log(e);
            }
        }
        getOrders();
    }, []);

    const TimeAgo = ({ timestamp }) => {
        const timeAgo = formatDistanceToNow(new Date(timestamp));
        return <span>{timeAgo} ago</span>;
    }

    const Button = ({ type }) => {
        return <button className={'widgetLgButton ' + type}>{type}</button>
    }

    return (
        <div className='widgetLg'>
            <h3 className="widgetLgTitle">Latest Transcations</h3>
            <table className='widgetLgTable'>
                <tr className='widgetLgTr'>
                    <th className='widgetLgTh'>OrderId</th>
                    <th className='widgetLgTh'>Username</th>
                    <th className='widgetLgTh'>Date</th>
                    <th className='widgetLgTh'>Amount</th>
                    <th className='widgetLgTh'>Status</th>
                </tr>
                {orders.slice(0,5).map((order) => (
                    <tr className='widgetLgTr' key={order._id}>
                        <td className='widgetLgorder'>
                            <span >{order._id}</span>
                        </td>
                        <td className='widgetLgUser'>
                            <span className="widgetLgName">{order.userId}</span>
                        </td>
                        <td className="widgetLgDate">
                            <TimeAgo timestamp={new Date(order.createdAt)} />
                        </td>
                        <td className="widgetLgAmount">₹{order.amount}</td>
                        <td className="widgetLgStatus"><Button type={order.status} /></td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default WidgetLg;