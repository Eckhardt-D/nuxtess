import type { User } from "@prisma/client";

type UserLoginOptions = {
  email: string;
  password: string;
};

type UserRegisterOptions = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
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

  const logout = () => {
    window.location.href = "/api/users/logout";
  };

  const register = async (options: UserRegisterOptions) => {
    const { data, error } = await $fetch("/api/users/register", {
      method: "POST",
      body: options,
    });

    if (!data || error) {
      return show(
        "Could not create an account, please check your details",
        "error"
      );
    }

    user.value = {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };

    useRouter().push("/profile");
  };

  const refresh = async () => {
    if (user.value) return user.value;

    const { data, error } = await $fetch("/api/users", {
      headers: {
        cookie: useRequestHeaders().cookie,
      },
    });

    if (!data || error) {
      return null;
    }

    user.value = {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };

    return user.value;
  };

  const getTwoFactorAuthSettings = async () => {
    return await $fetch("/api/2fa", {
      headers: {
        cookie: useRequestHeaders().cookie,
      },
    });
  };

  const enableTwoFactorAuth = async (otp: string) => {
    try {
      const { data } = await $fetch("/api/2fa/enable", {
        method: "POST",
        body: {
          otp,
        },
      });
      show("Successfully updated 2FA settings", "success");
      return data;
    } catch (error) {
      show("Could not activate 2FA, please try again", "error");
    }
  };

  const disableTwoFactorAuth = async () => {
    try {
      const data = await $fetch("/api/2fa/disable", {
        method: "POST",
      });
      return data;
    } catch (error) {
      show("Could not disable 2FA, please try again", "error");
    }
  };

  const verifyTwoFactorCode = async (otp: string) => {
    try {
      const { data } = await $fetch("/api/2fa/verify", {
        method: "POST",
        body: { otp },
      });
      return data;
    } catch (error) {
      show("Could not verify 2FA, please try again", "error");
    }
  };

  return {
    user,
    login,
    logout,
    register,
    refresh,
    enableTwoFactorAuth,
    disableTwoFactorAuth,
    verifyTwoFactorCode,
    getTwoFactorAuthSettings,
  };
};
