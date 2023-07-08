const groups = [
  {
    id: 1,
    name: "Web Dasturlash N82",
  },
  {
    id: 2,
    name: "NodeJS N7",
  },
  {
    id: 3,
    name: "ReactJS N64",
  },
];

const users = [
  {
    id: 1,
    first_name: "Javohir",
    last_name: "Rahimov",
  },
  {
    id: 2,
    first_name: "Doston",
    last_name: "Davalatov",
  },
  {
    id: 3,
    first_name: "E'zozbek",
    last_name: "Hamidov",
  }
];

const group_users = [
  {
    id: 1,
    group_id: 1,
    user_id: 1,
  },
  {
    id: 2,
    group_id: 1,
    user_id: 2,
  },
  {
    id: 3,
    group_id: 2,
    user_id: 3,
  }
];

const resolvers = {
  Query: {
    users: () => users,
    user: () => {
      const user = users.find((u) => u.id == args.id);
      if (!user) {
        throw new Error("Users not found");
      }
      return user;
    },
    groups: () => groups,
    group: (_, args) => {
      const group = groups.find((g) => g.id == args.id);
      if(!group) {
        throw new Error("Groups not found")
      }
      return group;
    }
  },

  Mutation: {
    // group uchun
    createGroup: (_, args) => {
      groups.push({
       id: groups.length + 1,
       name: args.input.name, 
      })
      return groups.at(-1);
    },
    updateGroup: (_, args) => {
      const group = groups.find((p) => p.id == args.id);
      const index = groups.findIndex((p) => p.id == args.id);

      if (!group) {
        throw new Error("Groups not found");
      }

      groups.splice(index, 1, { ...group, ...args.input });

      return groups[index];
    },
    removeGroup: (_, args) => {
      const group = groups.find((g) => g.id == args.id);
      const index = groups.findIndex((g) => g.id == args.id);

      if (!group) {
        throw new Error("Groups not found");
      }

      groups.splice(index, 1);

      return group;
    },
    // users uchun
    createUser: (_, args) => {
      users.push({
        id: users.length + 1,
        first_name: args.input.first_name, 
        last_name: args.input.last_name
       })
       return users.at(-1);
    },
    updateUser: (_, args) => {
      const user = users.find((u) => u.id == args.id);
      const index = users.findIndex((u) => u.id == args.id);

      if (!user) {
        throw new Error("Users not found");
      }

      users.splice(index, 1, { ...user, ...args.input });

      return users[index];
    },
    removeUser: (_, args) => {
      const user = users.find((u) => u.id == args.id);
      const index = users.findIndex((u) => u.id == args.id);

      if (!user) {
        throw new Error("Users not found");
      }

      users.splice(index, 1);

      return user;
    },
  },

  User: {
    groups: (parent) => {
      const lesson = group_users.find((item) => item.user_id === parent.id);
      return groups.filter((group) => group.id === lesson.group_id);
    },
  },
  Group: {
    users: (parent) => {
      const lesson = group_users.filter(
        (item) => item.group_id === parent.id
      );

      return users.filter((user) => {
        return lesson.find((item) => item.user_id === user.id);
      });
    },
  },
};

export default resolvers;
