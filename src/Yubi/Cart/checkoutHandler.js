// src/Yubi/Cart/checkoutHandler.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";

export const handleCheckout = async (items, cartTotal, clearCart, navigate, setShowCart) => {
    if (items.length === 0) {
        alert("Your cart is empty!");
        return false;
    }

    try {
        const user = auth.currentUser;
        if (!user) {
            alert("Please log in to place an order");
            return false;
        }

        // Create order in Firebase
        const orderData = {
            userId: user.uid,
            userEmail: user.email || "",
            items: items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity || 1
            })),
            total: cartTotal,
            status: "Pending",
            paymentStatus: "Pending",
            createdAt: serverTimestamp()
        };

        console.log("Creating order with data:", orderData);
        console.log("Creating order at path:", `customer/${user.uid}/orders`);

        const docRef = await addDoc(collection(db, "customer", user.uid, "orders"), orderData);
        console.log("✅ Order created successfully! Order ID:", docRef.id);

        // Navigate to payment page
        setShowCart(false);
        navigate("/customer/payment");

        return true;
    } catch (error) {
        console.error("❌ Error placing order:", error);
        console.error("Error details:", error.message, error.code);
        alert("Failed to place order. Please try again.\\nError: " + error.message);
        return false;
    }
};
