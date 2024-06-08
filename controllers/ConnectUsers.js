const cUserData = require("../models/connectUser");

async function handleUpdatingData(req, res) { // Correct function name here
    try {
        const body = req.body;
        if (!body.fullname || !body.email || !body.msg) {
            return res.status(400).json({ status: "Error", message: "First fill the required info" });
        }
        await cUserData.create({
            Fullname: body.fullname,
            Email: body.email,
            Msg: body.msg
        });
        return res.status(200).json({ status: "Success" });

    } catch (e) {
        if (e.name === 'ValidationError') {
            const validationErrors = {};
            // Extract validation errors and format them
            for (const field in e.errors) {
                validationErrors[field] = e.errors[field].message;
            }
            return res.status(400).json({ status: "Error", message: "Validation error", errors: validationErrors });
        } else {
            // Handle other errors
            return res.status(500).json({ status: "Error", message: e.message });
        }
    }
}
async function handlingReadingUsers(req, res) {
    try {
        const data = cUserData.find({});
        const dataset = {
            id: data._id,
            username: data.Fullname,
            email: data.Email,
            msg: data.Msg
        };
        return res.status(200).json(dataset);

    }
    catch (e) {
        if (e.name === 'ValidationError') {
            const validationErrors = {};
            // Extract validation errors and format them
            for (const field in e.errors) {
                validationErrors[field] = e.errors[field].message;
            }
            return res.status(400).json({ status: "Error", message: "Validation error", errors: validationErrors });
        } else {
            // Handle other errors
            return res.status(500).json({ status: "Error", message: e.message });
        }
    }
}

module.exports = {
    handleUpdatingData,
    handlingReadingUsers

    // Correct function name here
};
