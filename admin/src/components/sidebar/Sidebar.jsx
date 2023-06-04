import React from 'react'
import "./sidebar.css";
import {
    LineStyle,
    Timeline,
    TrendingUp,
    PermIdentity,
    Storefront,
    AttachMoney,
    BarChart,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report,
    PersonAdd,
    Home,
    LocalMall
} from "@material-ui/icons";
import { BrowserRouter, Link } from 'react-router-dom';

const Sidebar = () => {
    return (

        
        <>
            <div className="sidebar">
                <div className="sidebarWrapper">
                    <div className="sidebarMenu">
                        <h3 className="sidebarTitle">Dashboard</h3>
                        <ul className="sidebarList">
                            <Link to="/home" className="link">
                                <li className="sidebarListItem active">
                                    <Home className="sidebarIcon" />
                                    Home
                                </li>
                            </Link>
                            {/* <li className="sidebarListItem">
                                <Link to="/analytics" className="link">
                                    <Timeline className="sidebarIcon" />
                                    Analytics
                                </Link>
                            </li> */}
                            {/* <li className="sidebarListItem">
                                <Link to="/sales" className="link">
                                    <TrendingUp className="sidebarIcon" />
                                    Sales
                                </Link>
                            </li> */}
                        </ul>

                    </div>
                    <div className="sidebarMenu">
                        <h3 className="sidebarTitle">Quick Menu</h3>
                        <ul className="sidebarList">
                            <Link to="/home/users" className="link">
                                <li className="sidebarListItem">
                                    <PermIdentity className="sidebarIcon" />
                                    Users
                                </li>
                            </Link>
                            <Link to="/home/products" className="link">
                                <li className="sidebarListItem">
                                    <Storefront className="sidebarIcon" />
                                    Products
                                </li>
                            </Link>
                            <Link to="/home/transactions" className='link'>
                                <li className="sidebarListItem">
                                    <AttachMoney className="sidebarIcon" />
                                    Transactions
                                </li>
                            </Link>
                            {/* <li className="sidebarListItem">
                                <BarChart className="sidebarIcon" />
                                Reports
                            </li> */}
                        </ul>
                    </div>
                    <div className="sidebarMenu">
                        <h3 className="sidebarTitle">Quick Links</h3>
                        <ul className="sidebarList">
                            <Link to="/home/newUser" className='link'>
                                <li className="sidebarListItem">
                                    <PersonAdd className="sidebarIcon" />
                                    Add New User
                                </li>
                            </Link>
                            <Link to="/home/newproduct" className='link'>
                            <li className="sidebarListItem">
                                <LocalMall className="sidebarIcon" />
                                Add New Product
                            </li>
                            </Link>
                            {/* <li className="sidebarListItem">
                                <ChatBubbleOutline className="sidebarIcon" />
                                New Product Added
                            </li> */}
                        </ul>
                    </div>
                    {/* <div className="sidebarMenu">
                        <h3 className="sidebarTitle">Staff</h3>
                        <ul className="sidebarList">
                            <li className="sidebarListItem">
                                <WorkOutline className="sidebarIcon" />
                                Manage
                            </li>
                            <li className="sidebarListItem">
                                <Timeline className="sidebarIcon" />
                                Analytics
                            </li>
                            <li className="sidebarListItem">
                                <Report className="sidebarIcon" />
                                Reports
                            </li>
                        </ul>
                    </div> */}
                </div>
            </div>

        </>
    )
}

export default Sidebar
