import {users} from '../../../../constants'

export class UserService {
  async getAllUser() {
    return users;
  }

  async getUserById(id: number) {

    console.log({userId:id});
    
    return users?.find((user) => user.id === id);
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
