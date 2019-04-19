import express from "express";

import wordRoutes from "./word";
import pstatementRoutes from "./pstatement";
import sectionRoutes from "./section";
import toolRoutes from "./tool";

const router = express.Router();

router.use("/word", wordRoutes);
router.use("/pstatement", pstatementRoutes);
router.use("/section", sectionRoutes);
router.use("/tool", toolRoutes);

export default router;
