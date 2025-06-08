# mojosa

**mojosa** is a CLI utility that generates full React context boilerplate from a named TypeScript interface.  
It parses the interface in your source file — including properties and functions — and outputs typed React context with state hooks and stubbed methods.

---

## Features

- Parses TypeScript interfaces and extracts properties and functions.
- Generates a typed React context provider with state management.
- Includes typed stub functions for interface methods.
- Supports common state update patterns and async actions.
- Outputs ready-to-use React boilerplate for faster development.

---

## Installation

```bash
npm install -g mojosa
```

Or use `npx` without installing globally:

```bash
npx mojosa ./src/ExampleInterface.ts ExampleInterface
```

---

## Usage

```bash
mojosa <path-to-typescript-file> <name-of-interface>
```

When run, the CLI will prompt you to select the interface name from the file and specify an output path.

---

## Example

Given the interface in `src/UserContext.ts`:

```ts
export interface UserContext {
  userId: string;
  isLoggedIn: boolean;
  login: (userId: string) => void;
  logout: () => void;
}
```

Run:

```bash
mojosa ./src/UserContext.ts UserContext
```

You will be prompted to:

- Select the interface to generate context for (e.g., `UserContext`)
- Specify output file path (default suggestion: `UserContex.tsx`)

The generated React context file will include:

- `UserContextProvider` component
- `useUserContext` hook
- Typed state variables and functions matching the interface
- Stub implementations for functions throwing "not implemented" errors

---

## Development

Clone the repo and install dependencies:

```bash
git clone https://github.com/caressingbeast/mojosa.git
cd mojosa
npm install
```

Run tests:

```bash
npm test
```

Run lint:

```bash
npm run lint
```

Build the project:

```bash
npm run build
```

Try the CLI locally with:

```bash
npm link
mojosa --help
```

---

## Contributing

Contributions are welcome! Please open issues or pull requests for bug fixes, features, or improvements.

Make sure your code passes linting and tests before submitting.

---

## License

MIT © Brandon Burning
