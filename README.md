# retry-simulator
A lightweight and powerful TypeScript utility for retrying async functions with configurable retry strategies. retry-simulator helps you automatically retry failed async operations like API calls, database requests, or network fetches with with support for multiple backoff strategies.

---

## Features

- Automatically retry failed async operations
- Supports multiple backoff strategies:
    - Fixed
    - Linear
    - Exponential
- Fully configurable retry behavior
- Lightweight and easy to use
- Built with TypeScript
- Clean and minimal API

## Installation
```bash
npm install retry-simulator
```
---
## Quick Start
```ts
import { fetchWithRetry } from "retry-simulator";

async function fetchUsers() {
  const response = await fetch("[https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

fetchWithRetry(fetchUsers, { retries: 5, retryDelay: 1000, backoff: "fixed" })
  .then((result) => {
    console.log("SUCCESS:", result);
  })
  .catch((error) => {
    console.log("FINAL ERROR:", error.message);
  });
  ```

## Configuration Options
- retries default:3
- delay default:1000ms
- backoff (Fixed | Linear | Exponential)

---
## Backoff Strategies

### Fixed Backoff (Default)

Uses the same delay for every retry attempt.

```ts
backoff: "fixed"
```

#### Example
```txt
1000ms ➔ 1000ms ➔ 1000ms
```

---

### Linear Backoff

Delay increases linearly after every retry.

```ts
backoff: "linear"
```

#### Example
```txt
1000ms ➔ 2000ms ➔ 3000ms
```

---

### Exponential Backoff

Delay increases exponentially after every retry.

```ts
backoff: "exponential"
```

#### Example
```txt
1000ms ➔ 2000ms ➔ 4000ms
```

## Example: Exponential Backoff

```ts
fetchWithRetry(fetchUsers, {
  retries: 5,
  retryDelay: 1000,
  backoff: "exponential"
})
```

---

## Use Cases

`retry-simulator` is useful for:

- API requests
- Database calls
- File uploads
- Third-party services
- Background jobs
- Network-heavy applications

---
## Author

Built with TypeScript by Krish Patel.