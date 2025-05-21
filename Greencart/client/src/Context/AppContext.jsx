import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  });

  const [isSeller, setIsSeller] = useState(() => {
    try {
      const savedIsSeller = localStorage.getItem("isSeller");
      return savedIsSeller ? JSON.parse(savedIsSeller) : false;
    } catch (error) {
      console.error("Error parsing isSeller from localStorage:", error);
      return false;
    }
  });

  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : {};
    } catch (error) {
      console.error("Error parsing cartItems from localStorage:", error);
      return {};
    }
  });
  const [searchQuery, setSearchQuery] = useState({});

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
      localStorage.setItem("isSeller", JSON.stringify(isSeller));
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [user, isSeller, cartItems]);


  const logout = () => {
    setUser(null);
    setIsSeller(false);
    setShowUserLogin(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isSeller");  
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Added to Cart");
  };

  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };

  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    setCartItems(cartData); 
    toast.success("Removed Successfully");
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0 && itemInfo) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    setIsSeller,
    isSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartAmount,
    getCartCount,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};










// import { createContext, useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { dummyProducts } from "../assets/assets";
// import toast from "react-hot-toast";

// export const AppContext = createContext();

// export const AppContextProvider = ({children})=>{

//     const currency = import.meta.env.VITE_CURRENCY;
//     const navigate = useNavigate();
//     const [user,setUser] = useState(null) 
//     const [isSeller,setIsSeller] = useState(false) 
//     const [showUserLogin, setShowUserLogin] = useState(false) 
//     const [products, setProducts] = useState([]) 

//     //keep the cart item count in localstorage
//     const [cartItems, setCartItems] = useState(() => {
//         try {
//           const savedCart = localStorage.getItem("cartItems");
//           return savedCart ? JSON.parse(savedCart) : {};
//         } catch (error) {
//           console.error("Error parsing cartItems from localStorage:", error);
//           return {};
//         }
//       });

//     useEffect(() => {
//         try {
//           localStorage.setItem("cartItems", JSON.stringify(cartItems));
//         } catch (error) {
//           console.error("Error saving cartItems to localStorage:", error);
//         }
//       }, [cartItems]);



//     const [searchQuery, setSearchQuery] = useState({}) 

//     //fetch products
//     const fetchProducts = async ()=>{
//         setProducts(dummyProducts)
//     }    

//     //add produst to the cart
//     const addToCart = (itemId)=>{
//         let cartData = structuredClone(cartItems);

//         if(cartData[itemId]){
//             cartData[itemId] += 1;
//         }else{
//             cartData[itemId] = 1;
//         }
//         setCartItems(cartData);
//         toast.success("Added to Cart")
//     }

//     //update cart quantity
//     const updateCartItem = (itemId, quantity)=>{
//         let cartData = structuredClone(cartItems);
//         cartData[itemId] = quantity;
//         setCartItems(cartData)
//         toast.success("Cart Updated")
//     }

//     //remove product from cart
//     const removeFromCart = (itemId)=>{
//         let cartData = structuredClone(cartItems);
//         if(cartData[itemId]){
//             cartData[itemId] -= 1;
//             if(cartData[itemId] === 0){
//                 delete cartData[itemId];
//             }
//         }
//         toast.success("Removed Sucessfullty");
//         setCartItems(cartData)
//     }

//     //cart item count
//     const getCartCount = ()=>{
//         let totalCount = 0;
//         for(const item in cartItems){
//             totalCount += cartItems[item];
//         }
//         return totalCount;
//     }

//     //get cart total amount
//     const getCartAmount = ()=>{
//         let totalAmount = 0;
//         for(const items in cartItems){
//             let itemInfo = products.find((product) => product._id === items);
//             if(cartItems[items] > 0){
//                 totalAmount += itemInfo.offerPrice * cartItems[items]
//             }
//         }
//         return Math.floor(totalAmount * 100) / 100;
//     }

//     useEffect(() => {
//         fetchProducts()
//     },[])
    

//     const value = {navigate, user, setUser, setIsSeller, isSeller,
//         showUserLogin, setShowUserLogin, products, currency, addToCart,
//         updateCartItem, removeFromCart, cartItems,searchQuery,setSearchQuery,
//         getCartAmount,getCartCount
//     }
    
//     return <AppContext.Provider value={value}>
//         {children}
//     </AppContext.Provider>
// }

// export const useAppContext = () =>{
//     return useContext(AppContext)
// }