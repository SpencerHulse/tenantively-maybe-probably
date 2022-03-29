/* Property Info and Amenities Form */
const updateProperty = document.getElementById("save-btn");

const updatePropertyHandler = async (event) => {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const address = document.getElementById("property-address").value.trim();
  const zip_code = document.getElementById("property-zipcode").value.trim();
  const square_feet = document
    .getElementById("property-squarefootage")
    .value.trim();
  const monthly_rent = document
    .getElementById("property-monthlyrent")
    .value.trim();
  const bedrooms = document.getElementById("property-bedrooms").value.trim();
  const bathrooms = document.getElementById("property-bathrooms").value.trim();
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
    square_feet &&
    monthly_rent &&
    bedrooms &&
    bathrooms &&
    availability &&
    description &&
    property_type
  ) {
    const response = await fetch(`/api/properties/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        address,
        zip_code,
        square_feet,
        monthly_rent,
        bedrooms,
        bathrooms,
        availability,
        description,
        property_type,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      alert(response.statusText);
      return;
    }
  }

  const parking = document.getElementById("property-parking").value.trim();
  const laundry = document.getElementById("property-laundry-room").checked;
  const pets = document.getElementById("property-pets").checked;
  const pool = document.getElementById("property-pool").checked;

  if (parking) {
    const responseAmenities = await fetch("/api/amenities", {
      method: "PUT",
      body: JSON.stringify({
        id,
        parking,
        laundry,
        pets,
        pool,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!responseAmenities.ok) {
      alert(responseAmenities.statusText);
      return;
    }
  }

  window.location.replace("/dashboard");
};

updateProperty.addEventListener("click", updatePropertyHandler);

/* Delete the Property */
const deleteProperty = document.getElementById("remove-property");

const deletePropertyHandler = async (event) => {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/properties/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    window.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

deleteProperty.addEventListener("click", deletePropertyHandler);
