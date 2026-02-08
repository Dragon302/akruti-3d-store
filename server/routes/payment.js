const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

// 1. CREATE ORDER
router.post("/orders", async (req, res) => {
    try {
        // DEBUG: Print the keys and amount to the terminal
        console.log("--------------------------------");
        console.log("PAYMENT REQUEST RECEIVED");
        console.log("Key ID Exists?", !!process.env.RAZORPAY_KEY_ID);
        console.log("Amount Received (Rupees):", req.body.amount);

        // Validation: Check if amount is valid
        if (!req.body.amount || req.body.amount <= 0) {
             console.log("ERROR: Amount is invalid (0 or missing)");
             return res.status(400).json({ message: "Amount must be greater than 0" });
        }

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        // Razorpay expects amount in PAISE (1 Rupee = 100 Paise)
        // We use Math.round to ensure it is an Integer
        const options = {
            amount: Math.round(req.body.amount * 100), 
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        instance.orders.create(options, (error, order) => {
            if (error) {
                console.log("RAZORPAY API ERROR:", error); // <--- THIS WILL SHOW THE REAL REASON
                return res.status(500).json({ message: "Razorpay Failed", error: error });
            }
            console.log("ORDER CREATED SUCCESS:", order.id);
            res.status(200).json({ data: order });
        });

    } catch (error) {
        console.log("SERVER CRASH:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// 2. VERIFY PAYMENT
router.post("/verify", async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            res.status(200).json({ message: "Payment verified successfully" });
        } else {
            res.status(400).json({ message: "Invalid signature sent!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;