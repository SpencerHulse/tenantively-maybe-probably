// Handles the sign up process
const submitForm = document.getElementById("sign-up-form");

const submitFormHandler = async (event) => {
  event.preventDefault();

  const email = document.getElementById("sign-up-email").value.trim();
  const password = document.getElementById("sign-up-password").value.trim();
  const username = document.getElementById("sign-up-username").value.trim();
  // Uses regex to pull out only the numbers for storage
  const phone = document
    .getElementById("sign-up-phone")
    .value.match(/\d/g)
    .join("");

  if (email && password && username && phone) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ email, password, username, phone }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/?m=1");
    } else {
      alert(response.statusText);
    }
  }
};

submitForm.addEventListener("submit", submitFormHandler);
