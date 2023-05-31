import type { User } from "@prisma/client";

type UserLoginOptions = {
  email: string;
  password: string;
};

export default () => {
  const user = useState<Omit<User, "password"> | null>("user", () => null);
  const { show } = useFlash();

  const login = async (options: UserLoginOptions) => {
    const { data, error } = await $fetch("/api/users/login", {
      method: "POST",
      body: options,
    });

    if (!data || error) {
      return show("Could not login, please check your details", "error");
    }

    user.value = {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };

    useRouter().push("/profile");
  };

  return {
    user,
    login,
  };
};
