import { UserService } from "../../services/user/userService";

const userService = new UserService();

export const resolvers = {
  Query: {
    getUserById: async (_: any, { id }: { id: number }) => {
      try {
        console.log({ userServiceId: id });

        return await userService.getUserById(Number(id));
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getAllUsers: async () => {
      try {
        return await userService.getAllUser();
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },

  Mutation: {
    createUser: async (_: any, { input }: { input: any }) => {
      console.log({ input });

      try {
        return await userService.createUser(input);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateUser: async (_: any, { id, input }: { id: number; input: any }) => {
      try {
        return await userService.updateUser(id, input);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
