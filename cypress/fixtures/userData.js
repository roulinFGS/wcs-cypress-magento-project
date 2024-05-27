const id = Date.now();
const lastname = "Fabrice";
const firstname = "Roland";

// To test manually
// Fabrice.Roland@elie.wcs
// 123456Az

const newUser = {
  "firstname": firstname,
  "lastname": lastname,
  "password": "123456Az",
  "emailAddress": `${lastname}.${firstname + id}@elie.wcs`,
  "address1": "1 rue de la rue",
  "city": "Bordeaux",
  "zip": "33200",
  "phone": "0102030405",
  "CountryCode": "FR", // France
  "regionCode": "215" // Gironde
}

export {
  newUser
};