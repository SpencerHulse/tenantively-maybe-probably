const submitBtn = document.getElementById("submit-new-property");

const newProperty = async (event) => {
  event.preventDefault();

  const address = document.getElementById("property-address").value.trim();
  const zip_code = document.getElementById("property-zipcode").value.trim();
  const bedrooms = document.getElementById("property-bedrooms").value;
  const bathrooms = document.getElementById("property-bathrooms").value;
  const monthly_rent = document
    .getElementById("property-monthlyrent")
    .value.trim();
  const square_feet = document
    .getElementById("property-squarefootage")
    .value.trim();
  const availability = document
    .getElementById("property-availability")
    .value.trim();
  const property_type = document.getElementById("property-type").value.trim();
  const description = document
    .getElementById("property-description")
    .value.trim();

  if (
    address &&
    zip_code &&
    bedrooms &&
    bathrooms &&
    monthly_rent &&
    square_feet &&
    availability &&
    property_type &&
    description
  ) {
    const response = await fetch("/api/properties", {
      method: "POST",
      body: JSON.stringify({
        address,
        zip_code,
        bedrooms,
        bathrooms,
        monthly_rent,
        square_feet,
        availability,
        property_type,
        description,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      window.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

submitBtn.addEventListener("click", newProperty);
