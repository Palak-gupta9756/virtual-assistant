import User from "../models/user.model.js"
import uploadOnCloudinary from "../config/cloudinary.js"
export const getCurrentUser=async(req, res)=>{
    try {
        const userId=req.userId
        const user=await User.findById(userId).select("-password")
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({message:"get current user error"})
    }
}

export const updateAssistant = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    console.log("req.userId:", req.userId);

    const { assistantName, imageUrl } = req.body;
    let assistantImage;

    if (req.file && req.file.path) {
      assistantImage = await uploadOnCloudinary(req.file.path);
    } else {
      assistantImage = imageUrl;
    }

    if (!req.userId) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { assistantName, assistantImage },
      { new: true }
    ).select("-password");

    return res.status(200).json(user);
  } catch (error) {
    console.error("🔥 Backend Error in updateAssistant:", error);
    return res.status(500).json({ message: "Update assistant error", error: error.message });
  }
};
