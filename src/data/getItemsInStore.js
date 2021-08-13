import faker from "faker";
import { v4 } from "uuid";
faker.seed(123);

const getItemsInStore = () => {
  const data = [...Array(10)].map((item) => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    image: faker.random.image(),
    price: faker.commerce.price(),
    brand: faker.random.arrayElement(["Boat", "OnePlus", "Sony", "Bose"]),
    inStock: faker.datatype.boolean(),
    fastDelivery: faker.datatype.boolean(),
    color: faker.random.arrayElement(["red", "blue", "white"]),
    totalAvailableQuantity: 0,
    totalQuantity: 0,
    availableColors: [
      {
        colorId: v4(),
        color: "red",
        maxQuantityOfItemInRespectiveColor: faker.datatype.number() % 10,
        quantityOfItemInRespectiveColor: 0,
      },
      {
        colorId: v4(),
        color: "blue",
        maxQuantityOfItemInRespectiveColor: faker.datatype.number() % 10,
        quantityOfItemInRespectiveColor: 0,
      },
      {
        colorId: v4(),
        color: "white",
        maxQuantityOfItemInRespectiveColor: faker.datatype.number() % 10,
        quantityOfItemInRespectiveColor: 0,
      },
    ],
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
    category: faker.random.arrayElement(["headphones", "earphones", "airbuds"]),
    subcategory: faker.random.arrayElement(["wired", "wireless"]),

    offer: faker.random.arrayElement([
      "Save 50",
      "70% bonanza",
      "Republic Day Sale",
    ]),
  }));

  return data;
};
export { getItemsInStore };
