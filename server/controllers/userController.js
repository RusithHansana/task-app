import User from "../models/User.js";

//@desc Update user
//@route PUT /api/users/:id
//@access Private
export const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const userId = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { name, email },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error while updating user" });
  }
};
