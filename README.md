# COMP 3123 - Assignment 1
### Matthew Macalalad, 101510305

## **How to run the project:**
- Navigate to the root folder of the project in your terminal, and run "npm run start" or "npm run dev" to start the server
- Once the server is confirmed to be running, you can navigate over to Postman to test all endpoints
### Sample User Credentials:
- **Username:** matthew_mac
- **Email:** testemail@example.com
- **Password:** password123
- *When signing up, all fields must be filled. Email must be in valid email format, and password must be at least 8 characters.*

## **Endpoints to Test**
**1. Endpoint:** /api/v1/user/signup | **Method:** POST
- Body must include "username", "email", and "password"
**2. Endpoint:** /api/v1/user/login | **Method:** POST
- Body must include "password" and at least one of either "email" or "username"
**3. Endpoint:** /api/v1/emp/employees | **Method:** GET
**4. Endpoint:** /api/v1/emp/employees | **Method:** POST
- Body must include "first_name", "last_name", "email", "position", "salary", "date_of_joining", and "department"
**5. Endpoint:** /api/v1/emp/employees/{employee_id} | **Method:** GET
- Replace {employee_id} in the Request URL with a valid employee ID
**6. Endpoint:** /api/v1/emp/employees/{employee_id} | **Method:** PUT
- Replace {employee_id} in the Request URL with a valid employee ID
- Body can include any combination of "first_name", "last_name", "email", "position", "salary", "date_of_joining", and "department" 
**7. Endpoint:** /api/v1/emp/employees?employee_id={xxx} | **Method:** DELETE
- Replace {xxx} in the Request URL with a valid employee ID

*http://localhost:8081/api/v1 can be set to a base_url variable in Postman to reduce redundancy*


**Notes:**
- Installed jsonwebtoken, but will only implement if time allows.
- Two environment variables are present in the .env file (PORT and MONGO_URI)