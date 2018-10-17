import express from "express";

import wordRoutes from "./word";
import pstatementRoutes from "./pstatement";
import toolRoutes from "./tool";

const router = express.Router();

router.use("/word", wordRoutes);
router.use("/pstatement", pstatementRoutes);
router.use("/tool", toolRoutes);

export default router;
