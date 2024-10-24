import { z } from "zod";

const CreateFarmBodySchema = z.object({
    name: z.string().min(3).max(255),
    distance: z.number().positive()
});


export { CreateFarmBodySchema };

