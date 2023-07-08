const categories = [
  {
    id: 1,
    name: "Oqtepa Lavash",
  },
  {
    id: 2,
    name: "Nomdor osh somsa",
  },
  {
    id: 3,
    name: "Rayhon",
  },
];

const meals = [
  {
    id: 1,
    name: "Lag'mon",
    price: 25000,
    quantity: 4,
    category_id: 1,
  },
  {
    id: 2,
    name: "Somsa{tovuqli :)}",
    price: 6000,
    quantity: 1,
    category_id: 2,
  },
  {
    id: 3,
    name: "Sendvich",
    price: 32000,
    quantity: 6,
    category_id: 3,
  },
  {
    id: 4,
    name: "Burger",
    price: 17000,
    quantity: 5,
    category_id: 4,
  },
  {
    id: 5,
    name: "Osh",
    price: 27000,
    quantity: 13,
    category_id: 5,
  },
];

const resolvers = {
  Query: {
    meals: () => meals,
    meal: (_, args) => {
      const meal = meals.find((m) => m.id == args.id);
      if (!meal) {
        throw new Error("Meals not found");
      }
      return meal;
    },
    categories: () => categories,
    category: (_, args) => {
      const category = categories.find((c) => c.id == args.id);
      if (category) {
        throw new Error("Category not found");
      }
    },
  },
  Mutation: {
    createMeal: (_, args) => {
      meals.push({
        id: meals.length + 1,
        name: args.input.name,
        price: args.input.price,
        quantity: args.input.quantity
      });
      return meals.at(-1);
    },
    updateMeal: (_, args) => {
      const meal = meals.find((m) => m.id == args.id);
      const index = meals.findIndex((m) => m.id == args.id);
      if (!meal) {
        throw new Error("Meals not found");
      }

      meals.splice(index, 1, { ...meal, ...args.input });

      return meals[index];
    },
    removeMeal: (_, args) => {
      const meal = meals.find((c) => c.id == args.id);
      const index = meals.findIndex((c) => c.id == args.id);

      if (!meal) {
        throw new Error("Category not found");
      }

      categories.splice(index, 1);

      return meal;
    },
    createCategory: (_, args) => {
      categories.push({
        id: categories.length + 1,
        name: args.input.name,
      });
      return categories.at(-1);
    },
    updateCategory: (_, args) => {
      const category = categories.find((c) => c.id == args.id);
      const index = categories.findIndex((c) => c.id == args.id);

      if (!category) {
        throw new Error("Category not found");
      }

      categories.splice(index, 1, { ...category, ...args.input });

      return categories[index];
    },
    removeCategory: (_, args) => {
      const category = categories.find((c) => c.id == args.id);
      const index = categories.findIndex((c) => c.id == args.id);

      if (!category) {
        throw new Error("Category not found");
      }

      categories.splice(index, 1);

      return category;
    }
  },

  Meal: {
    category: (parent) => {
      return categories.find((category) => category.id === parent.category_id);
    },
  },
  Category: {
    meals: (parent) => {
      return meals.filter((meal) => meal.category_id === parent.id);
    },
  },
};

export default resolvers;