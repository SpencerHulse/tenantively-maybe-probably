// Handles adding a new property using the new-property form
const submitBtn = document.getElementById("submit-new-property");

const newProperty = async (event) => {
  event.preventDefault();

  // Form information for property
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

  // Ensures all required information is entered
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

    if (!response.ok) {
      alert(response.statusText);
    }

    // Form information for amenities
    let property_id;
    const parking = document.getElementById("property-parking").value.trim();
    const laundry = document.getElementById("property-laundry-room").checked;
    const pets = document.getElementById("property-pets").checked;
    const pool = document.getElementById("property-pool").checked;

    /*  Allows you to get the ID of the property made above using a 
    custom GET route that grabs the property created most recently by 
    the user using session user_id data. */
    const getPropertyResponse = await fetch(`/api/properties/new-property`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => (property_id = data[0].id));

    if (!getPropertyResponse) {
      alert(getPropertyResponse.statusText);
    }

    // Actual route to create amenities for the property
    const amenitiesResponse = await fetch(`/api/amenities`, {
      method: "POST",
      body: JSON.stringify({
        property_id,
        laundry,
        pets,
        pool,
        parking,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (amenitiesResponse.ok) {
      window.location.replace("/dashboard/?t=create");
    } else {
      alert(amenitiesResponse.statusText);
    }
  }
};

submitBtn.addEventListener("click", newProperty);
