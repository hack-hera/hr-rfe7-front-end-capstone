# Project Name

Front End Capstone.  Team Hera: Manny, Daniel, Jinyan and Alex S.

[Link to Trello Board](https://trello.com/b/PS0E1PSC/front-end-capstone)

[Mocks](https://xd.adobe.com/view/e600dc0f-454c-44e3-5075-7872d04189ff-9031/?fullscreen)

[Business Requirements Doc](https://docs.google.com/document/d/1KAqduzY8ae3DYrSoCL1i23qHe95zJRYFulqMk-sGLWY/edit#)

[API Documentation](https://learn-2.galvanize.com/cohorts/3052/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/API_Overview.md)


## Installation and helpful commands

```bash
git clone https://github.com/hack-hera/hr-rfe7-front-end-capstone.git

cd hr-rfe7-front-end-capstone

npm install

# Start Webpack
npm run react-dev

# Start dev server (nodemon)
npm run start-dev

# start the prod server (node)
npm start

## running the linter
npm run lint

## checkout a feature branch
git checkout -b yourname-name-of-feature
git add .
git commit -m 'finished awesome feature'
git push origin HEAD
git branch -D yourname-name-of-feature

## run the test suite

npm test
```


## Dev Instructions

### Styled Components & Theming

Any time you are defining a color (or any other CSS property that should be shared across components), you can make a property in the THEMES object.  If you need to add a property, you should add across all themes such that the themes (default, darkMode etc) all have the same structure.

In `settings/colors.js` a set of themes are defined e.g.

```javascript
export const THEMES = {
  default: {
    bg: '#ecf0f1',
    button: '#2ecc71',
    ...
  },

  darkMode: {
    bg: '#000',
    button: '#2ecc71',
    ...
  }
};
```

These themes are them passed down to all the child components via a `ThemeProvider` Component.  In this way we can easily change the theme prop in the top level component.

```HTML
<ThemeProvider theme={THEMES.default}>
  <Navigation>
  <ProductDetail>
  ...
</ThemeProvider>

```

Accessing the theme properties from child components:

```javascript
//Define a style component
const Navbar = styled.div`
  color: ${props => props.theme.navbarText};
  background-color: ${props => props.theme.navbarBackground};
`;

//Use a styled component in your code
<Navbar />
```
