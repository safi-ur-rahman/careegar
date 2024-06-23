# Careegar

Careegar is a comprehensive web platform designed to revolutionize the automotive customization experience in Pakistan. Leveraging the MERN stack (MongoDB, Express.js, React, Node.js) along with React Three Fiber JS, Careegar connects users with automotive solution providers, allows for 3D model customization of vehicles, and offers a versatile marketplace for vehicle auto-parts.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Contact](#contact)

## Features

- **Connect Users to Automotive Solution Providers:** Easily find and connect with trusted mechanics and customizers.
- **View/Configure Vehicle 3D Models:** Customize your vehicle using an interactive 3D model viewer.
- **Versatile Marketplace for Vehicle Auto-Parts:** Buy and sell auto parts with ease.
- **Make Appointments:** Schedule appointments with automotive experts directly through the platform.

## Technologies

- **Frontend:**
  - React.js
  - React Three Fiber JS
- **Backend:**
  - Node.js
  - Express.js
- **Database:**
  - MongoDB

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/safi-ur-rahman/careegar.git
    cd careegar
    ```

2. **Install dependencies for the backend:**
    ```bash
    cd server
    npm install
    ```

3. **Install dependencies for the frontend:**
    ```bash
    cd client
    npm install
    ```

4. **Set up environment variables:**
    - Edit the `.env` file in the `server` directory and add your MongoDB URI and other necessary environment variables.
    ```plaintext
    MONGO_URI=your-mongodb-uri
    ```

5. **Start the development server:**
    - **Backend:**
    ```bash
    cd server
    npm start
    ```
    - **Frontend:**
    ```bash
    cd client
    npm run dev
    ```

## Usage

- **User Registration/Login:** Users can register and log in to access the platform's features.
- **Profile Setup:** Users can setup their profile as a Car Owner, Mechanic, Customizer or Supplier.
- **Browse Services:** Users can browse through various automotive solution providers.
- **3D Model Customization:** Users can view and customize 3D models of vehicles.
- **Marketplace:** Users can buy and sell auto parts.
- **Appointments:** Users can schedule appointments with automotive experts.

## Contributing

We welcome contributions from the community to enhance Careegar. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## Contact

For any inquiries or feedback, please contact us at:
- Email: iamsafich@gmail.com

---

Thank you for using Careegar! We hope it enhances your automotive customization experience.
