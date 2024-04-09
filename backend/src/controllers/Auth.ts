import { User } from "../models/User";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import AsyncHandler from "../utils/AsyncHandler";
import { validateRegisterUser, validateLoginUser } from "../libs/validate";

const generateAccessAndRefreshToken = async (userId: string) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateAccessToken();

        user.refresh_token = refreshToken;
        await user.save({
            validateBeforeSave: false
        });

        return {
            accessToken,
            refreshToken,
        }

    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Internal Server Error");

    }
}

const options = {
    httpOnly: true,
    secure: true,
};

export const RegisterUser = AsyncHandler(async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const validate = validateRegisterUser.safeParse({
            name,
            email,
            password

        });
        if (!validate.success) {
            throw new ApiError(400, validate.error.message);
        }
        const exisitingUser = await User.findOne({ email })
        if (exisitingUser) {
            throw new ApiError(400, 'Email already exists');
        }
        const user = await User.create({
            email,
            password,
            name
        });
        await user.save();


        return res.json(new ApiResponse(201, 'User created successfully'));

    } catch (error) {
        throw new ApiError(500, 'Internal server error');
    }
})

export const LoginUser = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        const validate = validateLoginUser.safeParse({
            email,
            password
        })
        if (!validate.success) {
            throw new ApiError(400, validate.error.message);
        }
        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError(404, 'User not found');
        }
        const isMatch = await user.isPasswordCorrect(password);
        if (!isMatch) {
            throw new ApiError(400, 'Invalid password');
        }
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
        const loggedInUser = await User.findById(user._id).select("-password");

        return res
            .status(200)
            .cookie("refreshToken", refreshToken, options)
            .cookie("accessToken", accessToken, options)
            .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));

    } catch (error) {
        console.error(error);
        res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
})


export const LogoutUser = AsyncHandler(async (req, res) => {
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    return res.json(new ApiResponse(200, null, "User logged out successfully"));
});


export const LoginInWithGoogle = AsyncHandler(async (req, res) => {


})

export const updateToken = AsyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies;
    try {
        const user = await User.findOne({ refresh_token: refreshToken });
        if (!user) {
            throw new ApiError(401, "Unauthorized");
        }
        const { accessToken } = await generateAccessAndRefreshToken(user._id);
        return res.json(new ApiResponse(200, { accessToken }, "Token updated successfully"));
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Internal Server Error");
    }
})