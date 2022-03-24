# Self Study Section

Types of Tests:

**Unit tests (test one unit in isolation)**
- Mock dependencies (isolation), test internals
- Not necessarily how users interact with it + might break with refactoring

**Integration tests (test how multiple units work together)**

**Functional tests (test behaviour)**
- Include all relevant units/components (but mock server)
- Closer to how users interact with it + more robust than unit tests

**Acceptance / End-to-end (E2E) Tests (need browser & server)**


## Testing

### React Testing Library (RTL)

Provides virtual DOM (no browser needed!)
- Create components via render method inside virtual DOM
- Search inside virtual DOM
- Interact with virtual DOM

Opinionated
- Based on best practise
- Test your software the ways users actually use it (behaviour over impl) -> Functional Tests
- Find elements by accessibility markers (not test IDs)

#### Links

[Testing Library](https://testing-library.com/docs/)
[Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet/)

[Queries](https://testing-library.com/docs/queries/about)
[Async Handling](https://testing-library.com/docs/dom-testing-library/api-async/)

[Common mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
[Aria Roles](https://www.w3.org/TR/html-aria/#allowed-descendants-of-aria-roles)


### Jest

Purpose:
- Find tests
- Run tests
- Determine whether tests pass or fail (assertions)

Assertion Syntax:
- `expect(<argument>).<matcher>(<argument>)`
- `expect(someElement).toBeInTheDocument();`


#### Links

[Jest-DOM Matchers](https://github.com/testing-library/jest-dom#custom-matchers)

### Others

[Mock Service Worker](https://mswjs.io/)

## Material UI

https://v4.mui.com/

[Icons](https://v4.mui.com/components/material-icons/#material-icons)
