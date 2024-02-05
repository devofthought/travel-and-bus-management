# [Dhruto Travel](https://dhruto-travel-psi.vercel.app/)

_Thrives on connectivity and convenience, the transportation industry is at the forefront of transforming the way people travel. Welcome to “Dhruto travel”, your ultimate solution for streamlined bus ticket booking and efficient bus agency management._

### System Overview

- Travelers: The system is a comprehensive and user-friendly platform that seamlessly integrates bus ticket booking and bus agency management. Travelers can easily register, search for routes, view schedules, select seats, and make secure payments, receive instant e-tickets, and get detailed email/mobile messages for their journeys. and Also Travelers can reserve any full bus for special trips.

- Bus agencies: Benefit from dedicated admin, and bus-driver accounts enabling them to efficiently manage routes, and schedules. Scheduling involves creating and updating bus schedules for each route, with assignments for buses and drivers. Notifications ensure drivers are promptly informed of route, Scheduling, and cancellations, enhancing operational responsiveness. If a driver cancels his/her trip then re-assign another driver.

- Incident management allows agencies to record and oversee any accidents or mechanical issues, tracking details, status updates, and repair costs. The system also facilitates driver payroll management by tracking earnings based on assigned routes and completed trips.

- Admin also can view traveler information on trips such as his/her payment, route, seat info, and bus number.



### Languages/Technologies

| Backend                             | Frontend                     |
| ----------------------------------- | ---------------------------- |
| Express                             | Next.js                      |
| Typescript                          | JavsScript                   |
| Openapi swagger                     | AntDesign                    |
| Cookie-parser                       | Tailwind                     |
| Bcrypt                              | Reduxjs                      |
| Cors                                | Reduxjs-toolkit              |
| Dotenv                              | Redux-logger                 |
| Google-auth-library                 | Class-variance-authority     |
| Http-status                         | Date-fns                     |
| Jsonwebtoken                        | Gapi-script                  |
| Mongoose                            | Lucide-react                 |
| Zod                                 | React-day-picker             |


### Functional Requirements

#### Authentication:

##### Travelers:

- Travelers should be able to register for an account by providing their name, email address, and a secure password.
- Travelers should be able to log in for an account by providing an email address and a secure password.
- Travelers should also be able to register/log in for an account by Google provider.
- Travelers should also be able to reset the password for his/her own account.

##### Admin:

- Administrators should be able to log in securely using their credentials, including email and a secure password.
- Furthermore, administrators should have the capability to create or register bus drivers within the system.

##### Drivers

- Drivers should be able to log in to their accounts by providing their credentials.
- Additionally, drivers should have the option to register or log in using their Google credentials.

#### Travelers

- Travelers have the option to search for tickets on their selected route (From and to) and for a specific Date of the Journey.
- The search results are displayed on a card showcasing the Bus code, route details, Departure time, Arrival time, available seats, and Fare (ticket price).
- Travelers also can modify search and filtering with price, price range, and available seats.
- Depending on seat availability, a visual representation of the seating arrangement is provided, allowing Travelers to select a maximum of four seats and proceed to book them simultaneously.
- Completing the booking process, travelers receive a message or email containing comprehensive details regarding their journey.
- Reserve an entire bus for a special trip, offered at a unique pricing structure.
- A travel history is accessible, providing insights such as the route, Date of Journey, fare cost, and the seat that was booked, current booking status, among other pertinent information.
- Travelers can add a review/feedback about the service/bus/driver after completing a trip.
- Travelers are able to update their personal information such as name, email, phone, image, age, and password.

#### Drivers

- Receive notifications regarding their upcoming trips, inclusive of pertinent details such as route, departure time, arrival time, and bus code.
- Upon receiving a notification, drivers proceed to confirm the assignment, subsequently receiving a confirmation of the trip via email or message.
- Drivers have the ability to update their personal information, including name, email, phone number, and profile image.
- Additionally, drivers can access their trip history, encompassing route information, Date of Journey, departure and arrival times, and the number of travelers (associated with booked seats).

#### Admin

##### Travelers:

- Admin should have the capability to view and update traveler's information such as name, email, phone, image, and age.
- Admin can view a specific trip's list of travelers, including the status(paid/pending) of their fare costs if travelers are
- If a traveler fails to pay the ticket price within 10 minutes of seat reservation, the system admin retains the right to cancel the booking.
- Admin can view traveler history.
- Drivers:
- Admin should have the capability to create drivers with driver information such as name, driver's license, email, phone, age, experience, and image.
- Admin can view all driver's availability for the upcoming trip.

##### Routes:

- The admin has the capability to generate a trip, encompassing essential details such as the bus code, assigned driver, number of seats, route (from and to), departure and arrival times, as well as the corresponding fare cost.
- These created trips are prominently featured within the Travelers' search list.
- Furthermore, upon the creation of trips, drivers promptly receive notification messages, prompting them to confirm their availability for the assigned trip and they will be notified of the trip list.
- A history list compiles the details of past trips, encompassing the bus code, assigned driver, seat count, route (from & to), departure and arrival times, in conjunction with the corresponding fare cost. Additionally, the list indicates which seats were booked by travelers and the corresponding travelers' details.

##### Bus:

- Admin should have the capability to create a bus with bus details such as bus unique code, number planet, model, bus brand, number of bus seats, bus image, outer image, and inner image.
- Admin can view all the buses available on service for upcoming trips.
- Admin will view a comprehensive record of the bus's history, information such as the assigned driver, the route taken, and the number of travelers transported during each trip.

##### Bus reservation:

- Within this section, reserve requests are displayed for review on the list.
- Admin can possess the authority to approve these reserve requests by specifying the price, bus code, and driver.
- Travelers/requesters can get a notice by message/email about reservation requests.

##### Dashboard summary:

- It will be updated later.

##### Review:

- It will be updated later.

### Non-Functional Requirements

#### Security:

- User passwords must be securely stored using appropriate hashing and salting techniques
- API endpoints handling sensitive information should be protected using secure protocols (HTTPS).
- Authentication tokens should be securely generated and validated to prevent unauthorized access.

#### Performance

- The API should be able to handle a high volume of concurrent requests efficiently.
- Response times should be optimized to ensure a responsive user experience.

#### Scalability

- The application should be designed to accommodate future growth and increasing user demands.
- The architecture should allow for horizontal scalability, such as load balancing and distributed processing.

#### Reliability

- The API should be highly available, minimizing downtime and ensuring data integrity.
- Error handling and logging should be implemented to facilitate troubleshooting and maintenance.

#### Constraints

- The REST API Application should be implemented using a specific programming language or framework.
- The API may depend on external services or libraries for certain functionalities (e.g., email verification, file upload).

### Run

You need to start the server first. In the [server](./backend/) directory, execute the following commands:

```
$ cd .\server
$ yarn
$ yarn dev
```

Then, to spawn clients, go to the [client](./frontend/) directory and execute the following commands:

```
$ cd .\client
$ yarn
$ yarn dev
```


### Our Contributors
<a href="https://github.com/devofthought/travel-and-bus-management/graphs/contributors">
<img src="https://contrib.rocks/image?repo=devofthought/travel-and-bus-management" />
</a>
