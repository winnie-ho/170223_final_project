User.delete_all()
Group.delete_all()
Event.delete_all()
Message.delete_all()

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

group1 = Group.create(
  {
    name: "Running"
  }
)

group2 = Group.create(
  {
    name: "Cycling"
  }
)

event1 = Event.create(
  { 
    name: "Thursday Run",
    date: "2017-02-23",
    time: "17:30:00",
    location: "Run4it",
    description: "Usual Thursday long",
    route: "routeString",
    group: group2
  }
)

event2 = Event.create(
  { 
    name: "Park Run Breakfast",
    date: "2017-02-25",
    time: "09:30:00",
    location: "Cramond Shore",
    description: "Park Run along Cramond shore front",
    route: "routeString",
    group: group1
  }
)

group1.events.create(
  { 
    name: "Foxlake Night Trail",
    date: "2017-12-25",
    time: "19:30:00",
    location: "Foxlake",
    description: "Night trail race, need to bring head torch",
    route: "routeString",
    group: group1
  }
)

group1.messages.create(
  {
    msg: "Yes, cool with me.",
  }
)

group1.messages.create(
  {
    msg: "I can't make it, sorry guys",
  }
)

