import z from "zod";


export const validateRegisterUser = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
});


export const validateLoginUser = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})