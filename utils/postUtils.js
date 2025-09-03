import Journal from "../model/model.js";

async function delePostById(postId) {
  try {
    const deleteUser = await Journal.findByIdAndDelete(postId);
    if (!deleteUser) {
      console.log("User not found with id", postId);
      return null;
    }
    console.log("User deleted successfully");
  } catch (err) {
    console.error("Error deleting user");
  }
}

export default delePostById;
