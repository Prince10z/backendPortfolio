import { cUserData } from "../models/connectUser.js";
export async function handleUpdatingData(req, res) {
  // Correct function name here
  try {
    const body = req.body;
    if (!body.fullname || !body.email || !body.msg) {
      return res
        .status(400)
        .json({ status: "Error", message: "First fill the required info" });
    }
    await cUserData.create({
      Fullname: body.fullname,
      Email: body.email,
      Msg: body.msg,
    });
    return res.status(200).json({ status: "Success" });
  } catch (e) {
    if (e.name === "ValidationError") {
      const validationErrors = {};
      // Extract validation errors and format them
      for (const field in e.errors) {
        validationErrors[field] = e.errors[field].message;
      }
      return res.status(400).json({
        status: "Error",
        message: "Validation error",
        errors: validationErrors,
      });
    } else {
      // Handle other errors
      return res.status(500).json({ status: "Error", message: e.message });
    }
  }
}
export async function handlingReadingUsers(req, res) {
  try {
    const data = await cUserData.find({});

    const dataset = data.map((item) => ({
      id: item._id,
      username: item.Fullname,
      email: item.Email,
      msg: item.Msg,
      sendTime: item.createdAt,
    }));
    return res.status(200).json(dataset);
  } catch (e) {
    if (e.name === "ValidationError") {
      const validationErrors = {};
      // Extract validation errors and format them
      for (const field in e.errors) {
        validationErrors[field] = e.errors[field].message;
      }
      return res.status(400).json({
        status: "Error",
        message: "Validation error",
        errors: validationErrors,
      });
    } else {
      // Handle other errors
      return res.status(500).json({ status: "Error", message: e.message });
    }
  }
}

export async function handledeleteItem(req, res) {
  const body = req.body;
  if (!body.id) {
    return res.status(400).json({ status: "Requires id" });
  }
  try {
    const data = await cUserData.findById(body.id);
    if (data) {
      await cUserData.findByIdAndDelete(body.id);
      res.status(200).json({ status: "Success" });
    } else {
      res.status(403).json({ status: "Not item available" });
    }
  } catch (e) {
    return res.status(500).json({ status: "Error" });
  }
}
export async function handleDeleteAll(req, res) {
  try {
    const data = await cUserData.deleteMany({});
    return res.status(200).json({ status: "Success" });
  } catch (e) {
    return res.status(500).json({ status: "Server Error" });
  }
}
