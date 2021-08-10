import faker from "faker";
faker.seed(123);

const getItemsInStore = () => {
  const data = [...Array(50)].map((item) => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    image: faker.random.image(),
    price: faker.commerce.price(),
    brand: faker.random.arrayElement(["Boat", "OnePlus", "Sony", "Bose"]),
    inStock: faker.datatype.boolean(),
    fastDelivery: faker.datatype.boolean(),
    quantity: 0,
    category: faker.random.arrayElement(["headphones", "earphones", "airbuds"]),
    subcategory: faker.random.arrayElement(["wired", "wireless"]),
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
    offer: faker.random.arrayElement([
      "Save 50",
      "70% bonanza",
      "Republic Day Sale",
    ]),
    color: faker.commerce.color(),
  }));

  return data;
};
export { getItemsInStore };
