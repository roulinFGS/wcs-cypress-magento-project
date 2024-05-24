const id = Date.now();
const lastname = "Fabrice";
const firstname = "Roland";

const newUser = {
  "firstname": firstname,
  "lastname": lastname,
  "password": "123456Az",
  "emailAddress": `${lastname}.${firstname + id}@elie.wcs`
}

const existingUser = {
  "firstname": firstname,
  "lastname": lastname,
  "password": "123456Az",
  "emailAddress": `${lastname}.${firstname}@elie.wcs`,
  "address1": "1 rue de la rue",
  "city": "Bordeaux"
}

export {
  existingUser,
  newUser
};