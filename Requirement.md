# Build a Simple Book Catalog Application using React ,Redux & Typescript (Frontend Category)

## Problem statement:

Make better experience for travel booking tickets and agencies can manage their bus service, driver, etc.

### System overview:

<strong>Travelers: </strong>The system is a comprehensive and user-friendly platform that seamlessly integrates bus ticket booking and bus agency management. Travelers can easily register, search for routes, view schedules, select seats, and make secure payments, receiving instant e-tickets and get detailed email/mobile messages for their journeys. and Also Travelers can reserve any full bus for special trips.

<strong>Bus agencies: </strong>Benefit from dedicated admin, bus-driver accounts enabling them to efficiently manage routes, schedules.Scheduling involves creating and updating bus schedules for each route, with assignments for buses and drivers.notifications ensure drivers are promptly informed of route, Scheduling, cancellations, enhancing operational responsiveness. If driver cancels his/her trip then re-assign another driver.
Incident management allows agencies to record and oversee any accidents or mechanical issues, tracking it on details, status updates, and repairing cost. The system also facilitates driver payroll management by tracking earnings based on assigned routes and completed trips.
Admin also can view traveler information on trips such as his/her payment, route, seat info, bus-number.

### Functional Requirements

## Authentication:

# Bus Reservation System

## Functional Requirements

### Authentication

#### Travelers
- Travelers should be able to register for an account by providing their name, email address, and a secure password.
- Travelers should be able to log in by providing their email address and a secure password.
- Travelers should have the option to register or log in using their Google credentials.
- Travelers should be able to reset their account password.

#### Admin
- Administrators should securely log in using their credentials, including email and a secure password.
- Administrators should have the capability to create or register bus drivers within the system.

#### Drivers
- Drivers should be able to log in by providing their credentials.
- Drivers should have the option to register or log in using their Google credentials.

### Travelers

- Travelers have the option to search for tickets on their selected route (From & To) and for a specific Date of Journey.
- Search results are displayed on a card showcasing Bus code, route details, Departure time, Arrival time, available seats, and Fare (ticket price).
- Travelers can modify search and filtering with price, price range, and available seats.
- A visual representation of the seating arrangement is provided based on seat availability.
- Travelers can select a maximum of four seats and proceed to book them simultaneously.
- Upon completing the booking process, travelers receive a message or email with comprehensive details regarding their journey.
- Travelers can reserve an entire bus for a special trip, offered at a unique pricing structure.
- Accessible travel history provides insights such as the route, Date of Journey, fare cost, booked seat, current booking status, and other pertinent information.
- Travelers can add a review/feedback about the service/bus/driver after completing a trip.
- Travelers can update their personal information, including name, email, phone, image, age, and password.

### Drivers

- Receive notifications regarding upcoming trips, including route details, departure time, arrival time, and bus code.
- Confirm trip assignments and receive a confirmation via email or message.
- Update personal information, including name, email, phone number, and profile image.
- Access trip history, including route information, Date of Journey, departure and arrival times, and the number of travelers associated with booked seats.

### Admin

#### Travelers
- View and update travelers' information, including name, email, phone, image, and age.
- View a specific trip's list of travelers, including fare cost status (paid/pending).
- Cancel bookings if the traveler fails to pay the ticket price within 10 minutes of seat reservation.
- View traveler history.

#### Drivers
- Create drivers with information such as name, driving license, email, phone, age, experience, and image.
- View all drivers' availability for upcoming trips.

#### Routes
- Generate trips with essential details such as bus code, assigned driver, number of seats, route (from and to), departure and arrival times, and corresponding fare cost.
- Display created trips in the Travelers' search list.
- Notify drivers upon trip creation and prompt them to confirm availability.
- Maintain a history list of past trips, indicating bus code, assigned driver, seat count, route (from & to), departure and arrival times, and corresponding fare cost, along with booked seats and travelers' details.

#### Bus
- Create a bus with details such as bus unique code, number plate, model, bus brand, number of bus seats, bus image, outer image, and inner image.
- View all buses available for upcoming trips.
- View a comprehensive record of the bus's history, including assigned driver, route taken, and the number of travelers transported during each trip.

### Bus Reservation

- Display reserve requests for review by the admin.
- Admin has the authority to approve reserve requests by specifying the price, bus code, and driver.
- Travelers/requesters receive a notice by message/email about reservation requests.

## Non-Functional Requirements

### Security

- User passwords must be securely stored using appropriate hashing and salting techniques.
- API endpoints handling sensitive information should be protected using secure protocols (HTTPS).
- Authentication tokens should be securely generated and validated to prevent unauthorized access.

### Performance

- The API should be able to handle a high volume of concurrent requests efficiently.
- Response times should be optimized to ensure a responsive user experience.

### Scalability

- The application should be designed to accommodate future growth and increasing user demands.
- The architecture should allow for horizontal scalability, such as load balancing and distributed processing.

### Reliability

- The API should be highly available, minimizing downtime and ensuring data integrity.
- Error handling and logging should be implemented to facilitate troubleshooting and maintenance.

### Constraints

- The REST API Application should be implemented using a specific programming language or framework.
- The API may depend on external services or libraries for certain functionalities (e.g., email verification, file upload).



## User Interface
- [Add relevant non-functional requirements related to the user interface here, if applicable.]




