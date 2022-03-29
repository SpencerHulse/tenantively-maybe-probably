function showToasts() {
  const address = window.location.href;
  const splittedAddress = address.split("t=");
  // Deleted - toast
  if (splittedAddress[1] === "delete") {
    document.getElementById("myToast").innerHTML = deleteToast;
    $("#myToast").toast("show");
  }

  // Created - toast
  if (splittedAddress[1] === "create") {
    document.getElementById("myToast").innerHTML = createToast;
    $("#myToast").toast("show");
  }

  // Edit - toast
  if (splittedAddress[1] === "edit") {
    document.getElementById("myToast").innerHTML = editToast;
    $("#myToast").toast("show");
  }
}

function showModals() {
  const address = window.location.href;
  const splittedAddress = address.split("m=");
  if (splittedAddress[1] === "1") {
    document.getElementById("myModal").innerHTML = welcomeModal;

    $(document).ready(function () {
      $("#myModal").modal();
    });
  }
}

var deleteToast = `<div class="toast-body">
The property was removed successfully.
</div>`;

var createToast = `<div class="toast-body">
The property was successfully created.
</div>`;

var editToast = `<div class="toast-body">
The edited property was successfully saved.
</div>`;

var welcomeModal = `<div class="modal-dialog">
<div class="modal-content">
  <div class="modal-body">
    <div class="row">
      <div class="col">
        <img class="img-fluid mt-5" style="padding-left: 50px; padding-right: 50px;"
          src="/images/tenantively-logo-dark.png">
      </div>
      <hr class="mb-5 mt-5">
    </div>
    <h1 id="modal-title">Welcome to Tenantive.ly!</h1>
    <p class="modal-message">Tenantive.ly connects you and your properties with potential tenants with robust communication
      tools each step of the way. <br><br>Next, list your property and lead the industry to a new generation of Landlords.</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    <button type="button" class="btn btn-primary">Add a Property</button>
  </div>
</div>

</div>`;

showModals();
showToasts();
