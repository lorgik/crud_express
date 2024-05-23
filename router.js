import { Router } from "express";
import UserController from "./UserController.js";

const router = new Router();

router.get("/users", UserController.listUsers);
router.post("/users", UserController.createUser);
router.get("/users/:id", UserController.getUser);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

export default router;
