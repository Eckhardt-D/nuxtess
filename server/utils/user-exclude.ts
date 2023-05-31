export const exclude = <User, Key extends keyof User>(
  user: User,
  keys: Key[]
) => {
  for (let key of keys) {
    delete user[key];
  }
  return user;
};
