const submitForm = document.getElementById("sign-up-form");

const submitFormHandler = async (event) => {
  event.preventDefault();

  const email = document.getElementById("sign-up-email").value.trim();
  const password = document.getElementById("sign-up-password").value.trim();
  const username = document.getElementById("sign-up-username").value.trim();
  const phone = document.getElementById("sign-up-phone").value.trim();

  if (email && password && username && phone) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ email, password, username, phone }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

submitForm.addEventListener("submit", submitFormHandler);
