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

        await addDoc(collection(db, "orders"), orderData);

        // Clear cart and show confirmation
        clearCart();
        alert("Order placed successfully! 🎉\\n\\nYour order has been submitted and is being processed.");
        setShowCart(false);
        navigate("/customer/dashboard");

        return true;
    } catch (error) {
        console.error("Error placing order:", error);
        alert("Failed to place order. Please try again.\\nError: " + error.message);
        return false;
    }
};
