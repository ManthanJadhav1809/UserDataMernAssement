// const bcrypt = require("bcrypt");
// const User = require("./models/User"); // Adjust the path as necessary

// async function createDefaultAdmin() {
//   const adminExists = await User.findOne({ email: "admin@example.com" });

//   if (!adminExists) {
//     const hashedPassword = await bcrypt.hash("Admin@123", 10);
//     const admin = new User({
//       firstName: "Admin",
//       lastName: "User",
//       email: "admin@example.com",
//       password: hashedPassword,
//       role: "admin", // Add a "role" field in your User schema
//     });

//     await admin.save();
//     console.log("Default admin created.");
//   } else {
//     console.log("Admin already exists.");
//   }
// }

// createDefaultAdmin();
