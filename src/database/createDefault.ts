import Role from "./models/role-model";

async function initializeDefaultRoles() {
  try {
    const defaultRoles = ["ADMIN", "UNACTIVATED", "USER"];

    for (const roleName of defaultRoles) {
      await Role.findOneAndUpdate(
        { value: roleName },
        { $setOnInsert: { value: roleName } },
        { upsert: true, new: true }
      );
    }

    console.log("Default roles initialized successfully");
  } catch (error) {
    console.error("Error initializing default roles:", error);
    process.exit(1);
  }
}

export default async () => {
  await initializeDefaultRoles();
};
