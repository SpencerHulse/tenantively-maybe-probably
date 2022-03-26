const logoutBtn = document.getElementById("logout");

const logoutHandler = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "content-type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};

logoutBtn.addEventListener("click", logoutHandler);
