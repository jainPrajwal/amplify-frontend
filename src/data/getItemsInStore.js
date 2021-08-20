import faker from "faker";
import { v4 } from "uuid";
export const colorsAvailable = ["red", "blue", "white"];
export const brands = ["Boat", "OnePlus", "Sony", "Bose"];
export const category = ["headphones", "earphones", "airbuds"];
export const subcategory = ["wired", "wireless"];
const getItemsInStore = () => {
  const data = [...Array(10)].map((item) => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    image: faker.random.image(),
    sellingPrice: 0,
    price: faker.commerce.price(),
    brand: faker.random.arrayElement(brands),
    inStock: faker.datatype.boolean(),
    fastDelivery: faker.datatype.boolean(),
    color: faker.random.arrayElement(colorsAvailable),
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
    category: faker.random.arrayElement([...category]),
    subcategory: faker.random.arrayElement([...subcategory]),

    offer: faker.random.arrayElement([
      "Save 50",
      "70% bonanza",
      "Republic Day Sale",
    ]),
  }));

  return data;
};
export { getItemsInStore };
