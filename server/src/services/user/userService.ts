const users = [
  {
    id: 1,
    fname: "usman",
    lname: "khan",
    age: 24,
    married: true,
  },
  {
    id: 2,
    fname: "mahad",
    lname: "khan",
    age: 22,
    married: true,
  },
  {
    id: 3,
    fname: "zohaib",
    lname: "khan",
    age: 20,
    married: true,
  },
  {
    id: 4,
    fname: "zaid",
    lname: "khan",
    age: 18,
    married: false,
  },
];

export class UserService {
  async getAllUser() {
    return users;
  }

  async getUserById(id: number) {

    console.log({userId:id});
    
    return users.find((user) => user.id === id);
  }

  async createUser(createUser: any) {
    const { fname, lname, age, married } = createUser;

    const newUser = {
      id: users.length + 1,
      fname,
      lname,
      age,
      married,
    };
    users.push(newUser);
    return newUser;
  }

  async updateUser(id: number, updateUser: any) {
    const { fname, lname, age, married } = updateUser;
    const user = await this.getUserById(id);

    if (user) {
      user.fname = fname;
      user.lname = lname;
      user.age = age;
      user.married = married;
      users[id] = user;
    } else {
      throw new Error("User not found");
    }

    return user;
  }
}
