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
     
      var signupErr = `
      <div class="toast-header bg-danger">
      <strong class="me-auto text-white">Sign up error</strong>
      </div>
      <div class="toast-body">
      The username or email address is already in use.
      </div>`;
      
            document.getElementById("myToast").innerHTML = signupErr;
            $("#myToast").toast("show");

    }
  }
};

submitForm.addEventListener("submit", submitFormHandler);
