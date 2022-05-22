# Auth-Service

Session based authentication service made with Express framework

# API
### Register
Example request
```bash
curl -d "name=user" -d "password=password" -d "email=user@example.com" http://localhost/api/auth/register
```
Example response
```js
{
    sessionId: "123e4567-e89b-12d3-556642440000",
    id: 1,
    name: "user",
    email: "user@example.com"
}
```
### Login
Example request
```bash
curl "http://localhost/api/auth/login?username=user&password=password"
```
Example response
```js
{
    sessionId: "123e4567-e89b-12d3-556642440000",
    id: 1,
    name: "user",
    email: "user@example.com"
}
```
### Error codes
```
UEXISTS - Send when registration fails due to user existence in database
```