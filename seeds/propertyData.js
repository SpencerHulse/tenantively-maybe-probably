const { Property } = require("../models");

const propertyData = [
  {
    user_id: 1,
    address: "3001 This Place Drive",
    zip_code: 99999,
    bedrooms: 2,
    bathrooms: 1.5,
    monthly_rent: 900,
    square_feet: 600,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Lorem donec massa sapien faucibus et molestie ac feugiat sed. Pharetra sit amet aliquam id diam maecenas ultricies mi. Fames ac turpis egestas sed tempus urna et. Euismod elementum nisi quis eleifend. Volutpat ac tincidunt vitae semper quis lectus nulla. Congue eu consequat ac felis donec et odio. Sed pulvinar proin gravida hendrerit lectus. Duis tristique sollicitudin nibh sit. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Urna nunc id cursus metus aliquam eleifend. Id leo in vitae turpis massa sed elementum tempus.",
    availability: "April 10th",
    property_type: "House",
    property_image: "1648307679260.jpg",
  },
  {
    user_id: 2,
    address: "2000 Where It Be Blvd",
    zip_code: 11111,
    bedrooms: 10,
    bathrooms: 6,
    monthly_rent: 3000,
    square_feet: 2500,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Lorem donec massa sapien faucibus et molestie ac feugiat sed. Pharetra sit amet aliquam id diam maecenas ultricies mi. Fames ac turpis egestas sed tempus urna et. Euismod elementum nisi quis eleifend. Volutpat ac tincidunt vitae semper quis lectus nulla. Congue eu consequat ac felis donec et odio. Sed pulvinar proin gravida hendrerit lectus. Duis tristique sollicitudin nibh sit. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Urna nunc id cursus metus aliquam eleifend. Id leo in vitae turpis massa sed elementum tempus.",
    availability: "Now",
    property_type: "House",
    property_image: "1648383293809.jpg",
  },
  {
    user_id: 2,
    address: "2000 Come Inside Street",
    zip_code: 11111,
    bedrooms: 15,
    bathrooms: 6,
    monthly_rent: 5000,
    square_feet: 10000,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Lorem donec massa sapien faucibus et molestie ac feugiat sed. Pharetra sit amet aliquam id diam maecenas ultricies mi. Fames ac turpis egestas sed tempus urna et. Euismod elementum nisi quis eleifend. Volutpat ac tincidunt vitae semper quis lectus nulla. Congue eu consequat ac felis donec et odio. Sed pulvinar proin gravida hendrerit lectus. Duis tristique sollicitudin nibh sit. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Urna nunc id cursus metus aliquam eleifend. Id leo in vitae turpis massa sed elementum tempus.",
    availability: "Now",
    property_type: "House",
  },
];

const seedProperties = () => Property.bulkCreate(propertyData);

module.exports = seedProperties;
