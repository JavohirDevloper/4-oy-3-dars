const posts = [
  {
    id: 1,
    title: "Dasturlashdan ilk maoshingni olganingda?",
    content: 40,
    user_id: 1,
  },
  {
    id: 2,
    title: "Dasturlashga ishga kirsam?",
    content: 20,
    user_id: 2,
  },
  {
    id: 3,
    title: "Bir kun kvartirada bir o'zing yashasang?",
    content: 20,
    user_id: 2,
  },
];

const users = [
  {
    id: 1,
    name: "Javohir",
  },
  {
    id: 2,
    name: "Orzu",
  },
];

const comments = [
  {
    id: 1,
    text: "Mendan baxtli odamni o'zi yo'q :)",
    user_id: 2,
    post_id: 1,
  },
  {
    id: 2,
    text: "Uydagilar xursand bo'ladi endi soqqani qilaman :)",
    user_id: 1,
    post_id: 2,
  },
  {
    id: 3,
    text: "Ovqatsizlik, wifi yuqligi odamni o'limdan battar ahvolga olib keladi :(",
    user_id: 1,
    post_id: 3,
  },
];

const resolvers = {
  Query: {
    posts: () => posts,
    post: (_, args) => {
      const post = posts.find((p) => p.id == args.id);
      if (!post) {
        throw new Error("Posts not found");
      }
      return post;
    },
    users: () => users,
    user: () => {
      const user = users.find((u) => u.id == args.id);
      if (!user) {
        throw new Error("Users not found");
      }
      return user;
    },
    comments: () => comments,
    comment: () => {
      const comment = comments.find((c) => c.id == args.id);
      if (!comment) {
        throw new Error("Comments not found");
      }
      return comment;
    },
  },
  Mutation: {
    // post uchun
    createPost: (_, args) => {
      posts.push({
        id: posts.length + 1,
        title: args.input.title,
        content: args.input.content,
      });
      return posts.at(-1);
    },
    updatePost: (_, args) => {
      const post = posts.find((p) => p.id == args.id);
      const index = posts.findIndex((p) => p.id == args.id);

      if (!post) {
        throw new Error("Posts not found");
      }

      posts.splice(index, 1, { ...post, ...args.input });

      return posts[index];
    },
    removePost: (_, args) => {
      const post = posts.find((p) => p.id == args.id);
      const index = posts.findIndex((p) => p.id == args.id);

      if (!post) {
        throw new Error("Posts not found");
      }

      posts.splice(index, 1);

      return post;
    },

    // user uchun
    createUser: (_, args) => {
      users.push({
        id: users.length + 1,
        name: args.input.name,
      });
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

    // comment uchun
    createComment: (_, args) => {
      comments.push({
        id: comments.length + 1,
        text: args.input.text,
      });
      return comments.at(-1);
    },
    updateComment: (_, args) => {
      const comment = comments.find((c) => c.id == args.id);
      const index = comments.findIndex((c) => c.id == args.id);

      if (!comment) {
        throw new Error("Users not found");
      }

      comments.splice(index, 1, { ...comment, ...args.input });

      return comments[index];
    },
    removeComment: (_, args) => {
      const comment = comments.find((c) => c.id == args.id);
      const index = comments.findIndex((c) => c.id == args.id);

      if (!comment) {
        throw new Error("Users not found");
      }

      comments.splice(index, 1);

      return comment;
    },
  },

  Post: {
    user: (parent) => {
      return users.find((user) => user.id === parent.user_id);
    },
    comments: (parent) => {
      return comments.filter((comment) => comment.post_id === parent.id);
    },
  },
  User: {
    posts: (parent) => {
      return posts.filter((post) => post.user_id === parent.id);
    },
  },
  Comment: {
    user: (parent) => {
      return users.find((user) => user.id === parent.user_id);
    },
    post: (parent) => {
      return posts.find((post) => post.id === parent.post_id);
    },
  },
};

export default resolvers;