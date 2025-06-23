# Listr - Directory Comparison Tool

A lightweight command-line utility to compare two directories and list files that are unique to each directory. Built with TypeScript and Node.js.

## Features

- 🚀 Fast recursive directory comparison
- 📋 Lists files that exist in one directory but not the other
- 🎨 Clean, color-coded console output
- ⚙️ Simple and intuitive command-line interface
- 📦 Zero external dependencies (only uses Node.js built-ins)

## Installation

### Global Installation (Recommended)

```bash
npm install -g .
```

### Local Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/listr.git
cd listr

# Install dependencies
npm install

# Build the project
npm run build
```

## Usage

### Basic Usage

```bash
list <directory1> <directory2>
```

This will show all files that are unique to either directory.

### Examples

Compare two directories:

```bash
listr /path/to/first/dir /path/to/second/dir
```

Show only files unique to the first directory:

```bash
listr -1 /path/to/first/dir /path/to/second/dir
```

Show only files unique to the second directory:

```bash
listr -2 /path/to/first/dir /path/to/second/dir
```

## Options

| Option | Description                                      |
|--------|--------------------------------------------------|
| `-1`   | Show only files unique to the first directory  |
| `-2`   | Show only files unique to the second directory |

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```

### Development Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Run the tool directly with ts-node
- `npm test` - Run tests (to be implemented)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC © 2025
