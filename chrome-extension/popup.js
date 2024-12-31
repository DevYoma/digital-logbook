import { createClient } from "@supabase/supabase-js"

// const supabase = window.supabase.createClient(
//   "https://mezxlegzliekeaqkrnjt.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lenhsZWd6bGlla2VhcWtybmp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2ODUyNDQsImV4cCI6MjAzMzI2MTI0NH0.2Tgv0ZFf0-M7N1miPvvoiVMbKWyyul7O_18zot4sQzk"
// );

const supabaseUrl = "https://your-supabase-url.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lenhsZWd6bGlla2VhcWtybmp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2ODUyNDQsImV4cCI6MjAzMzI2MTI0NH0.2Tgv0ZFf0-M7N1miPvvoiVMbKWyyul7O_18zot4sQzk";
const supabase = createClient(supabaseUrl, supabaseKey);

window.supabase = supabase;

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("login");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const logList = document.getElementById("log-list");

  // Login functionality
  loginButton.addEventListener("click", async () => {
    const { user, error } = await supabase.auth.signIn({
      email: emailInput.value,
      password: passwordInput.value,
    });

    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      alert(`Welcome, ${user.email}!`);
      loadLogs(); // Load logs after logging in
    }
  });

  async function loadLogs() {
  // Load logs (for example purposes)
    const { data: logs, error } = await supabase
      .from("dailyLogs") // Make sure you have a table named "logs"
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    logList.innerHTML = ""; // Clear current list
    logs.forEach((log) => {
      const li = document.createElement("li");
      li.textContent = log.content; // Adjust based on your log structure
      logList.appendChild(li);
    });
  }
});
