User.delete_all()

user_one = User.create(
  {
    email: "winnie@email.com",
    password: "password",
    password_confirmation: "password"
  }
)

user_two = User.create(
  {
    email: "tegan@email.com",
    password: "password",
    password_confirmation: "password"
  }
)

g1 = Group.create(
  {
    name: "Running"
  }
)

g2 = Group.create(
  {
    name: "Cycling"
  }
)

