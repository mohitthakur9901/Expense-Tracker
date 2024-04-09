import { User } from "../models/User";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import AsyncHandler from "../utils/AsyncHandler";


export const updateUser = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!user) throw new ApiError(404, "User not found");
        return res.json(new ApiResponse(200, user, "User updated successfully"));

    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Internal Server Error");

    }
});


export const deleteUser = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) throw new ApiError(404, "User not found");
        return res.json(new ApiResponse(200, user, "User deleted successfully"));
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Internal Server Error");

    }
});

