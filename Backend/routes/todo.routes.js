import Router from "express"
import { AddTodo, DeleteTodo, FetchTodo, UpdateTodo } from "../controller/todos.controller.js"

const router = Router()

router.route("/").get(FetchTodo)
router.route("/").post(AddTodo)
router.route("/:id").put(UpdateTodo)
router.route("/:id").delete(DeleteTodo)

export default router