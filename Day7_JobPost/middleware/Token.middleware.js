import { ApiError } from "../utils/ApiError.js";
import jwt, { decode } from "jsonwebtoken";

export const accessTokenGet = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded;
            console.log("accessToken User", decoded);
            next();
        } catch (error) {
            console.log("Invalid access token:", error);
            next(new ApiError(401, "Invalid access token"));
        }
    } else {
        console.log("Access token error: token not found");
        next(new ApiError(400, "Access token not found"));
    }
};
