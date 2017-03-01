User.delete_all()
Group.delete_all()
Event.delete_all()
Message.delete_all()

user_one = User.create(
  {
    name: "Winnie Ho",
    email: "winnie@email.com",
    password: "password",
    password_confirmation: "password"
  }
)

user_two = User.create(
  {
    name: "Tegan Gallacher",
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

group3 = Group.create(
  {
    name: "Atkins Run Group"
  }
)

group4 = Group.create(
  {
    name: "Cohort 8"
  }
)

group3.events.create(
  { 
    name: "Thursday Run",
    date: "2017-02-23",
    time: "17:30:00",
    location: "Run4it",
    description: "Usual Thursday long",
    route: "routeString"
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
    route: "routeString"
  }
)

group1.events.create(
  { 
    name: "Arthurs Seat",
    date: "2017-12-20",
    time: "17:30:00",
    location: "Run4it",
    description: "Long but hilly",
    route: "routeString"
  }
)

group4.events.create(
  { 
    name: "End of Projects Pub",
    date: "2017-03-02",
    time: "16:30:00",
    location: "Footlights",
    description: "What a long week! What a long 16 weeks! A little beverage.",
    route: "NA"
  }
)

group4.events.create(
  { 
    name: "Graduation",
    date: "2017-03-03",
    time: "16:30:00",
    location: "Frankensteins",
    description: "GRADUATION!",
    route: "NA"
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

group4.messages.create(
  {
    msg: "Last week!!" 
  }
)


group4.messages.create(
  {
    msg: "Last project presentations ahh!😖." 
  }
)

group4.messages.create(
  {
    msg: "Footlights for afters?!" 
  }
)

group4.messages.create(
  {
    msg: "It's part of the project process!" 
  }
)

