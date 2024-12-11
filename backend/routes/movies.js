import express from "express";
import moviesController from "../controllers/moviesController.js";

const router = express.Router()

// show all films
router.get('/', moviesController.index)

// show one film
router.get('/:id', moviesController.show)

export default router