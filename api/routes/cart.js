const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Cart = require("../models/Cart");
const router = require("express").Router();

//Create

router.post("/", async (req, res) => {

    try {
        const exist = await Cart.findOne({ userId: req.body.userId, productId: req.body.productId, size: req.body.size })

        if (!exist) {
            const newCart = new Cart(req.body);
            const savedProduct = await newCart.save();
            console.log("new product ", newCart)

            res.status(200).json(savedProduct);
        }
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
})

// Update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {

    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedCart);
    } catch (e) {
        res.status(500).json(e);
    }
})

//Delete
router.delete("/:id", async (req, res) => {
    try {
        await Cart.findOneAndDelete({ productId: req.params.id });
        res.status(200).json("Cart has been deleted");
    } catch (e) {
        res.status(500).json(e);
    }
})



//Get User Cart

router.get("/find/:id", async (req, res) => {
    try {
        const cart = await Cart.find({ userId: req.params.id });
        res.status(200).json(cart);
    } catch (e) {
        res.status(500).json(e);
    }
})

//Get All

router.get("/", async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (e) {
        res.status(500).json(e);
    }
})

// delete user cart

router.delete("/find/:id", async (req, res) => {
    try {
        const del = await Cart.deleteMany({ userId: req.params.id })
        res.status(200).send(del);
    } catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router;