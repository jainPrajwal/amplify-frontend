export const Users = [
  {
    name: "prajwal",
    username: "jainprajwal123@gmail.com",
    password: "1234",
  },
  {
    name: "abc",
    username: "abc@gmail.com",
    password: "123",
  },
];

export const fakeAuthAPI = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = Users.find((user) => user.username === username);

      if (!user) return reject(new Error("user not found!"));
      user.password === password
        ? resolve(user)
        : reject(new Error("invalid password"));
    }, 3000);
  });
};

export const fakeSignUpAPI = ({ name, username, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Users.push({ name, username, password });
      resolve(Users);
    }, 3000);
  });
};
