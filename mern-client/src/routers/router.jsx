import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import App from "..//App";
import Home from "../home/Home";
import Shop from "../shop/Shop";
import About from "../components/About";
import SingleBook from "../shop/SingleBook";
import AwardBooks from "../shop/AwardBooks";
import Dashboardlayout from "../dashboard/Dashboardlayout";
import Dashboard from "../dashboard/Dashboard";
import UploadBooks from "../dashboard/UploadBooks";
import ManageBooks from "../dashboard/ManageBooks";
import EditBooks from "../dashboard/EditBooks";
import Signup from "../components/Signup";
import Login from "../components/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Logout from "../components/Logout";
import AdminIn from "../components/AdminIn";
import ShopNow from "../components/ShopNow";
import WishlistDetails from "../shop/WishlistDetails";
import Orderpage from "../shop/Orderpage";
import Notifications from "../shop/Notifications";
import NotificationsPage from "../components/NotificationsPage";
import LoginPage from "../DeliverySec/LoginPage";
import ProvinceOrders from "../DeliverySec/ProvinceOrders";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: "/shop",
            element: <PrivateRoute><ShopNow/></PrivateRoute>        },

        {
            path: "/about",
            element: <About/>
        },
        
        {
          path: "/AwardBooks" ,
          element: <AwardBooks/>
      },{
        path:"logout",
        element: <Logout/>
      },{
        path:"wishlist-details",
        element: <WishlistDetails/>
      },

        {
          path: "/book/:id",
          element: <SingleBook/>,
          loader:({params}) => fetch (`http://localhost:5000/books/${params.id}`)
        }

      ]
    },
    {
      path: "/admin/dashboard",
      element: <Dashboardlayout/>,
      children:[
        {
          path: "/admin/dashboard",
          element: <PrivateRoute><Dashboard/></PrivateRoute>
        
        },
        {
          path: "/admin/dashboard/upload",
          element: <UploadBooks/>
        
        },
        
        {
          path: "/admin/dashboard/manage",
          element: <ManageBooks/>
        
        },{
          path:"/admin/dashboard/orders",
          element: <Orderpage/>
        }, 
        {
          path: "/admin/dashboard/edit-books/:id",
          element: <EditBooks/>,
          loader:({params}) => fetch (`http://localhost:5000/books/${params.id}`)
        
        },{
          path: "/admin/dashboard/notifications/:email",
          element: <Notifications/>
        }
        
      ]
    },
    {
      path:"/sign-up",
      element: <Signup/>
    },
    {
      path:"login",
      element: <Login/>
    },{
      path: "/adminIn",
      element: <AdminIn/>
    },{
      path: "/notifications/:email",
      element: <PrivateRoute><NotificationsPage/></PrivateRoute> 

    },{
      path: "/deliverylogin",
      element: <LoginPage/>
    },{
      path:"/ordersdelivery" ,
      element: <ProvinceOrders/>
    }
  ]);

  export default router;