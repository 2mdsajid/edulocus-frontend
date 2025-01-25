# AUTH 

- session object from prisma adapter has a authToken property which stores a token
- session has also a user object to store users data
session = {
    authToken: string(jwt) // for validations
    user: TBaseUser | null // for user data
}
- authToken is sent back and forth to backend to verify the user authentication and authorization

- TBaseUser is missing image in backend but present in frontend

- no error shown during login when the backend is offline
