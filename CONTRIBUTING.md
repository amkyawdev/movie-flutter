<p align="center">
  <img src="https://img.shields.io/badge/Contributing-Guide-blue?style=flat-square" alt="Contributing">
  <a href="https://github.com/amkyawdev/movie-flutter/blob/main/CODE_OF_CONDUCT.md"><img src="https://img.shields.io/badge/Code.of-Conduct-purple?style=flat-square" alt="Code of Conduct"></a>
</p>

# 🤝 Contributing to AMKyawDev Recap App

Thank you for your interest in contributing to **AMKyawDev Recap App**! We welcome contributions from the community to help improve this video subtitle editing application.

---

## 📋 Table of Contents

- [📖 Quick Guide](#-quick-guide)
- [🐛 Bug Reports](#-bug-reports)
- [💡 Feature Requests](#-feature-requests)
- [🔧 Pull Requests](#-pull-requests)
- [📝 Code Standards](#-code-standards)
- [🧪 Testing](#-testing)
- [💻 Development Setup](#-development-setup)
- [📦 Release Process](#-release-process)
- [❓ Questions](#-questions)

---

## 📖 Quick Guide

```bash
# 1. Fork the repository
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/movie-flutter.git
cd movie-flutter

# 3. Create a feature branch
git checkout -b feature/amazing-feature

# 4. Make your changes
# 5. Test thoroughly
# 6. Commit with descriptive message
git commit -m "Add amazing feature"

# 7. Push and create PR
git push origin feature/amazing-feature
```

---

## 🐛 Bug Reports

We use [GitHub Issues](https://github.com/amkyawdev/movie-flutter/issues) to track bugs.

### Reporting a Bug

1. **Search existing issues** - Please check if the bug has been reported before
2. **Create a new issue** with the bug template
3. **Include**:
   - Clear title with bug description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots/videos if applicable
   - Environment details (OS, browser, versions)
   - Minimal reproduction code

### Bug Report Template

```markdown
## Bug Description
[Clear and concise description]

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Environment
- OS: [e.g., macOS 14.0]
- Browser: [e.g., Chrome 119]
- App Version: [e.g., 1.0.0]

## Additional Context
[Any other context about the problem]
```

---

## 💡 Feature Requests

We welcome new feature ideas! Please follow this process:

### Requesting a Feature

1. **Check existing issues** - Avoid duplicate requests
2. **Open a discussion** - Get feedback before implementing
3. **Create an issue** with the feature template

### Feature Request Template

```markdown
## Feature Summary
[Short description of the feature]

## Use Case
[Who is this for? Why is it needed?]

## Proposed Solution
[Your ideas for implementation]

## Alternatives Considered
[Any alternative solutions you've considered]

## Additional Context
[Screenshots, mockups, or examples]
```

---

## 🔧 Pull Requests

We accept PRs for bug fixes, features, documentation, and more.

### PR Process

1. **Fork & Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/movie-flutter.git
   ```

2. **Create Branch**
   ```bash
   git checkout -b fix/bug-description
   git checkout -b feature/feature-description
   git checkout -b docs/improvement-description
   ```

3. **Make Changes**
   - Follow code standards
   - Add/update tests
   - Update documentation

4. **Commit**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

   Use [conventional commits](https://conventionalcommits.org):
   ```bash
   git commit -m "fix: resolve issue with subtitle timing"
   git commit -m "feat: add dark mode support"
   git commit -m "docs: update README"
   git commit -m "refactor: optimize video processing"
   ```

5. **Push**
   ```bash
   git push origin fix/bug-description
   ```

6. **Create PR**
   - Fill out the PR template
   - Link related issues
   - Request reviewers

### PR Template

```markdown
## Description
[Summary of changes]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation
- [ ] Refactoring
- [ ] Testing

## Related Issues
Closes #XXX

## Testing
- [ ] Tests pass locally
- [ ] Added/updated tests

## Screenshots
[If UI changes]
```

### PR Titles

Use conventional prefix:
```
fix: short description
feat: short description
docs: short description
chore: short description
refactor: short description
test: short description
```

---

## 📝 Code Standards

### Languages

| Component | Language |
|-----------|----------|
| Frontend | TypeScript |
| Hooks/Utils | TypeScript |
| Styles | CSS |
| Flutter | Dart |

### Style Guides

- **TypeScript**: Follow ESLint configuration
- **Dart**: Follow Flutter analyzer
- **CSS**: BEM naming for custom styles

### General Principles

1. **Keep it simple** - Prefer straightforward solutions
2. **DRY** - Don't Repeat Yourself
3. **Document** - Add JSDoc for functions
4. **Type** - Use TypeScript types everywhere
5. **Test** - Cover new functionality

### File Naming

```
# Components PascalCase
VideoPlayer.tsx
SubtitleEditor.tsx

# Hooks camelCase
useFFmpeg.ts
useSubtitleEdit.ts

# Utils camelCase
subtitleParser.ts
videoProcessor.ts
```

---

## 🧪 Testing

### Test Requirements

| Type | Coverage Goal |
|------|---------------|
| Unit Tests | 80%+ |
| Integration | Key flows |

### Running Tests

#### Next.js Frontend
```bash
cd nextjs-frontend
npm test           # Run tests
npm test:coverage  # With coverage
npm run lint       # Lint
```

#### Flutter App
```bash
cd flutter-app
flutter test        # Run tests
flutter analyze    # Analyze
```

### Test Structure

```
tests/
├── components/
│   ├── VideoPlayer.test.tsx
│   └── SubtitleEditor.test.tsx
├── hooks/
│   └── useFFmpeg.test.ts
└── utils/
    └── subtitleParser.test.ts
```

---

## 💻 Development Setup

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | 18+ LTS |
| npm | 9+ |
| Flutter | 3.x |

### Local Setup

```bash
# Next.js Frontend
cd nextjs-frontend
npm install
npm run dev

# Flutter App
cd flutter-app
flutter pub get
flutter run -d chrome
```

### Docker Development

```bash
# All services
docker-compose up --build

# Just Next.js
docker-compose up nextjs-frontend
```

---

## 📦 Release Process

### Versioning

We use [Semantic Versioning](https://semver.org):

```
MAJOR.MINOR.PATCH
1.0.0
^-^---^---
|  |   |
|  |   +-- Bug fixes
|  +---- New features (backward compatible)
+------- Breaking changes
```

### Release Checklist

- [ ] Update version in `package.json`
- [ ] Update `CHANGELOG.md`
- [ ] Run all tests
- [ ] Build production assets
- [ ] Create GitHub release
- [ ] Publish to package managers

### Changelog Format

```markdown
## [1.1.0] - 2024-01-15

### Added
- New feature description

### Fixed
- Bug fix description

### Changed
- Description of changes

### Removed
- Description of removals
```

---

## ❓ Questions

| Channel | When to Use |
|---------|------------|
| [Discussions](https://github.com/amkyawdev/movie-flutter/discussions) | General questions |
| [Issues](https://github.com/amkyawdev/movie-flutter/issues) | Bugs and features |
| [Discord](https://discord.gg/example) | Real-time chat |

---

## 🙏 Acknowledgments

Thanks to all contributors!

<a href="https://github.com/amkyawdev/movie-flutter/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=amkyawdev/movie-flutter" />
</a>

---

<p align="center">
  Made with ❤️ by <strong>AMKyawDev</strong>
</p>