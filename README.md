<div align="center">
  <h1>Wheels Wash</h1>
</div>

## Live URL

1. `Live Deployment Link (Client):`
2. `Live Deployment Link (Server): `
3. `GitHub Repository Client :` https://github.com/muntasirmoin/assignment-05-level-2-client-site.git
4. `GitHub Repository Server :` https://github.com/muntasirmoin/assignment-05-level-2-server-site.git
5. `Project Overview Video :`

## User Login

- email: user@gmail.com
- password: user

## Admin Login

- email: admin@gmail.com
- password: admin

## Service details page To get available slot select date :

- [Service name] [available slot data]

1. car ---------[16/09/24]
2. jeep 4 x 4---[17/09/24]
3. truck--------[18/09/24]
   `------ `
4. wheel Pre----[09/09/24]

## Introduction

Welcome to Wheels Wash! We are your trusted partner for comprehensive vehicle service and wash solutions. At Wheels Wash, we understand the importance of maintaining your vehicle's cleanliness and performance. Our goal is to provide top-quality services that keep your vehicle in pristine condition.

Our team of experienced professionals is dedicated to delivering exceptional service. Whether you're looking for a quick wash or a complete service package, we offer a range of options to meet your needs. We use the latest technology and eco-friendly products to ensure your vehicle gets the care it deserves.

At Wheels Wash, we pride ourselves on our commitment to customer satisfaction. We go the extra mile to make sure our customers leave with a smile, knowing their vehicle has been expertly serviced and cleaned.

## Project Description

Our mission at Wheels Wash is to provide reliable and high-quality vehicle service and wash solutions that enhance the longevity and appearance of your vehicle. We are dedicated to delivering services that exceed customer expectations, making us the preferred choice for vehicle owners.

We envision Wheels Wash as a leader in the vehicle service and wash industry, recognized for our innovation, customer-centric approach, and commitment to excellence. Our goal is to set the standard for quality in vehicle care, helping our customers maintain their vehicles in top condition.

## Features:

1. Home page:

- Navigation menu
- Footer
- Features od services
- Review Submit and View All review

2. Service page:

- Search and sort option for service data and can select single data click on Details

3. Booking Page:

- Selected Service (site) and User Booking details (right)
- Click on Pay Now open payment page

4. About Page

- Introduction, mission, vision of this Wheels Wash.

5. Login Page
6. SignUp Page [user can register here]
7. DashBoard User

- User Can update user info. User can view his past and upcoming booking.

8. Dashboard Admin

- Admin can update user role.
- Can add, update, delete Service data.
- Can add slot data! Can change Slot status only between available and cancel, not booked one!

### Installation Steps [How to set up and use the application locally.]

1. Step-by-step instructions on how to install the project.

- clone client site
- Clone server site
- Open the code On VS code
- To run client site cmd : npm run dev
- To run server site cmd : npm run start:dev

### - Install dependency

- date-fns
- jwt-decode
- localforage
- match-sorter
- mongoose
- phosphor-react
- react
- react-dom
- react-helmet-async
- react-hook-form
- react-icons
- react-redux
- react-router-dom
- redux
- redux-persist
- sonner
- sort-by
- sweetalert2
- To install these packages use npm: `npm install`

### - Install devDependencies (if required)

### Configuration

1. Create a `.env` file in the root directory of the project.
2. Add necessary configuration variables in the `.env` file.
   Example:

   ```bash
    PORT=5000
    DB_URL=your_db_connection_uri
    STORE_ID="###"
     <!-- Payment https://www.aamarpay.com/ -->
    SIGNATURE_KEY="#########"
    PAYMENT_URL="####"
    PAYMENT_VERIFY_URL="####"

   ```

3. server's root path: http://localhost:5000/
