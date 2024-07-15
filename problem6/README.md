# Scoreboard API Service Module

This document details the design and functionality of the Scoreboard API Service Module, responsible for managing user scores and updating the leader board in real-time.

## Functionality

- Stores user scores in a persistent database (e.g., MySQL, PostgresSQL, MongoDB, ... ).
- Provides an API endpoint to update user scores upon authorized action completion.
- Retrieves the top 10 user scores in real-time for displaying on the website's leaderboard.
- Implements robust security measures to prevent unauthorized score manipulation.

## API Endpoint

**URL:** `/api/v1/scores/update`

**Method:** POST

**Request Body:** (JSON)

```json
{
  "userId": <integer: user ID>,
  "actionId": <integer: action ID (optional, for logging purposes)>,
  "scoreDelta": <integer: amount by which to increase the user's score>
}
```

**Response: (JSON)**

- Status:

  - 200 OK: Score updated successfully.
  - 401 Unauthorized: Invalid authentication token.
  - 403 Forbidden: Action not allowed or unauthorized user.

```json
{
  "status": <number>,
  "success": <boolean: true if update successful, false otherwise>,
  "message": <string: optional message explaining outcome>,
  "updatedLeaderboard": [
    { "userId": ..., "score": ..., "rank": ... },
    ... (top 10 users)
  ]
}
```

## Authentication

- Authorization Token: The API requires an authorization token for user authentication.
- Request Header: Include the token in the request header (Authorization: Bearer <token>).
- Token Validation: The backend server validates the token and retrieves the corresponding user ID.

## Security Considerations

- Authentication: The API enforces user authentication using a valid token to prevent unauthorized score modification.
- Authorization: The backend service can implement additional authorization checks based on user roles or permissions (e.g., only specific actions or users can increase scores).
- Input Validation: The API validates user ID, action ID (if provided), and score delta to ensure valid data types and prevent potential injection attacks.
- Rate Limiting: To mitigate potential denial-of-service attacks, consider implementing rate limiting on API calls.
- Logging: Log all API requests and responses for auditing purposes.

## Database Considerations

- Choose a database that supports efficient read/write operations for frequent score updates and leaderboard retrieval.
- Consider caching mechanisms to improve leaderboard retrieval performance.

## Flow of Execution Diagram

![Flow chart](./Problem%206_%20Architecture.jpg)

[Link Flow chart online](https://drive.google.com/file/d/19jOV58qJgx2gwVnIYOwZnwyrAFTPc2RJ/view?usp=drive_link)

1. User Action: The user performs an action on the website.
2. API Request: The frontend sends a POST request to the /api/v1/scores/update endpoint with the user ID, optional action ID, and score delta.
3. Validation: The API service validates the request (authentication, input validation).
4. Score Update: Upon successful validation:

   - Update the user's score in the database (increment by score delta).
   - Update any cached leaderboard data.

5. Leaderboard Retrieval: Retrieve the top 10 users and their scores from the database.
6. API Response: Respond to the client with a JSON object indicating success, an optional message, and the updated leaderboard data.
7. Frontend Update: The frontend updates the website's leaderboard with the received data.

## Improvements

- Granular Score Updates: Consider allowing score updates by a specific amount instead of always increasing.
- Leaderboards by Categories: Implement additional API endpoints to retrieve leaderboards for specific categories (if applicable).
- Pagination: For potentially large leaderboards, enable pagination in API responses to retrieve data in chunks.
- Error Handling: Provide more informative error messages in the response to aid debugging.
- Unit Tests: Implement unit tests to ensure the API service functions as expected.
- Real-time Updates: Implementing real-time score updates using WebSockets or server-sent events (SSE).
- Performance Optimization: Optimize database queries and caching strategies to handle high traffic and scalability.

## Implementation Notes

- Language and Framework: Choose a suitable programming language and framework based on the project's requirements and developer expertise.
- Database Technology: Utilize a database that can handle the anticipated data volume and access patterns, ensuring efficient read/write operations.
- Authentication and Authorization: Implement robust authentication and authorization mechanisms to secure the API endpoints.
- Caching Strategies: Evaluate caching mechanisms to improve leaderboard retrieval performance and reduce database load.
- Error Handling: Implement error handling mechanisms to provide informative error messages and prevent crashes.
- Performance Monitoring: Continuously monitor API performance and optimize code and database queries to maintain responsiveness and scalability.

By following these guidelines and incorporating the suggested improvements, the backend engineering team can develop a robust, secure, and scalable Scoreboard API Service Module that enhances the user experience and effectively manages user scores.
