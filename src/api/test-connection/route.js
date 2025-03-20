async function handler() {
  try {
    const result = await sql`SELECT 1`;
    return {
      success: true,
      message: "Database connection successful",
    };
  } catch (error) {
    return {
      success: false,
      message: "Database connection failed",
      error: error.message,
    };
  }
}