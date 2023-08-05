"use strict";

var express = require("express");
const models = require("../models/model");
const model = require("../models/model");


const router = express.Router();
module.exports = router;





// escriban sus rutas acá
// siéntanse libres de dividir entre archivos si lo necesitan


router.get('/categories', (req, res) => {


    try {

        res.status(200).json(models.listCategories());

    } catch (error) {

        res.status(404).json({ error: error.message });

    }

})


router.post('/categories', (req, res) => {


    const { category } = req.body;

    try {

        models.addCategory(category)

        res.status(201).json({ msg: 'Categoría creada correctamente' });


    } catch (error) {

        res.status(400).json({ error: error.message });

    }

})


router.get('/products', (req, res) => {


    try {

        res.status(200).json(models.listProducts());

    } catch (error) {

        res.status(404).json({ error: error.message });

    }


})

router.post('/products', (req, res) => {

    const { name, brand, category, stock } = req.body;

    try {


        res.status(201).json(models.addProduct(name, brand, category, stock))


    } catch (error) {

        res.status(404).json({ error: 'La categoría ingresada no existe' });


    }

})

router.get('/products/:categoryName', (req, res) => {


    const { categoryName } = req.params;
    const { fullName } = req.query;

    try {
        res.status(200).json(models.listProducts(categoryName, fullName));
    } catch (error) {
        res.status(404).json({ error: 'La categoría no existe' });
    }

})


router.get('/reviews', (req, res) => {


    const { name } = req.query;

    try {

        const review = models.getReviews(name);


        return res.status(200).json(review);

    } catch (error) {

        res.status(404).json({ error: 'Producto no encontrado' });

    }

})

router.post('/reviews', (req, res) => {

    const { name, stars, text, user } = req.body;


    try {
        models.addReview(name, stars, text, user)
        res.status(201).json({ msg: 'Reseña agregada correctamente' });


    } catch (error) {

        res.status(400).json({ error: error.message });
    }

})

router.get('/rating', (req, res) => {


    try {

        res.status(200).json(models.getRating());

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
})

router.get('/rating/:product', function (req, res) {


    const { product } = req.params;

    try {

        const rat = models.getRating(product);

        res.status(200).json({ rating: rat });

    } catch (error) {

        res.status(404).json({ error: 'Producto no encontrado' });
    }




})
