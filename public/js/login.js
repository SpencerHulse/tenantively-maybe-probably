// Handles the login process
const submitForm = document.getElementById("login-form");

const submitFormHandler = async (event) => {
  event.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      var loginErr = `
<div class="toast-header bg-danger">
<strong class="me-auto text-white">Login error</strong>
</div>
<div class="toast-body">
Incorrect email address or password
</div>`;

      document.getElementById("myToast").innerHTML = loginErr;
      $("#myToast").toast("show");
    }
  }
};

submitForm.addEventListener("submit", submitFormHandler);
