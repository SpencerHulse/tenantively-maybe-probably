// Turns the data into a month/day/year format
const format_date = (date) => {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();
  return `${month}/${day}/${year}`;
};

// Turns stored phone number into a dashed (xxx-xxx-xxxx) phone number format
const format_phone = (phoneNumber) => {
  return (
    "(" +
    phoneNumber.toString().slice(0, 3) +
    ")-" +
    phoneNumber.toString().slice(3, 6) +
    "-" +
    phoneNumber.toString().slice(6, 10)
  );
};

// Helper for the dashboard plan costs form
const cost_per_month = (listings) => {
  return listings * 90;
};

// Helper to pluralize properties when needed for dashboard
const pluralize_that_property = (numberOfProperties) => {
  if (numberOfProperties === 1) {
    return "property";
  } else {
    return "properties";
  }
};

// Helper to pluralize listing when needed for dashboard
const pluralize_that_listing = (numberOfListings) => {
  if (numberOfListings === 1) {
    return "listing";
  } else {
    return "listings";
  }
};

// Helper to pluralize bedrooms when needed for single-property page
const pluralize_those_bedrooms = (numberOfBedrooms) => {
  if (numberOfBedrooms === 1) {
    return "bedroom";
  } else {
    return "bedrooms";
  }
};

// Helper to pluralize bathrooms when needed for single-property page
const pluralize_those_bathrooms = (numberOfBathrooms) => {
  // == because decimal datatype reads as string
  if (numberOfBathrooms == 1) {
    return "bathroom";
  } else {
    return "bathrooms";
  }
};

module.exports = {
  format_date,
  format_phone,
  cost_per_month,
  pluralize_that_property,
  pluralize_that_listing,
  pluralize_those_bedrooms,
  pluralize_those_bathrooms,
};
