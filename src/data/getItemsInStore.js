import faker from "faker";

import { v4 } from "uuid";
export const colorsAvailable = ["red", "blue", "white"];
export const brands = ["Boat", "Apple", "Sony", "Bose"];
export const category = ["headphones", "earphones", "airbuds"];
export const subcategory = ["wired", "wireless"];
faker.seed(123);
const getItemsInStore = () => {
  const data = [...Array(10)].map((_) => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    image: faker.random.image(),
    sellingPrice: 0,
    price: faker.commerce.price(),
    brand: faker.random.arrayElement(brands),
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

  // const newdata = [
  //   {
  //     id: "123",
  //     name: "kaala chasma",
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGTWbPVhUK-djRvTVmvSRkS4DSpB1rYKU5w&usqp=CAU",
  //     sellingPrice: 12,
  //     price: 14,
  //     brand: faker.random.arrayElement(brands),
  //     fastDelivery: false,
  //     color: faker.random.arrayElement(colorsAvailable),
  //     totalAvailableQuantity: 0,
  //     totalQuantity: 0,
  //     availableColors: [
  //       {
  //         colorId: "red1",
  //         color: "red",
  //         maxQuantityOfItemInRespectiveColor: faker.datatype.number() % 10,
  //         quantityOfItemInRespectiveColor: 0,
  //       },
  //       {
  //         colorId: "blue1",
  //         color: "blue",
  //         maxQuantityOfItemInRespectiveColor: faker.datatype.number() % 10,
  //         quantityOfItemInRespectiveColor: 0,
  //       },
  //       {
  //         colorId: "white1",
  //         color: "white",
  //         maxQuantityOfItemInRespectiveColor: faker.datatype.number() % 10,
  //         quantityOfItemInRespectiveColor: 0,
  //       },
  //     ],
  //     ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  //     category: faker.random.arrayElement([...category]),
  //     subcategory: faker.random.arrayElement([...subcategory]),

  //     offer: faker.random.arrayElement([
  //       "Save 50",
  //       "70% bonanza",
  //       "Republic Day Sale",
  //     ]),
  //   },
  // ];
  return data;
};
export { getItemsInStore };
