# Project Catwalk

Front End Capstone Project at Hack Reactor.

Team Hera: Emmanuel Garcia, Daniel Gonzalezmoreno, Jinyan Li and Alex Sieke.

[Link to Trello Board](https://trello.com/b/PS0E1PSC/front-end-capstone)

[Mocks](https://xd.adobe.com/view/e600dc0f-454c-44e3-5075-7872d04189ff-9031/?fullscreen)

[Business Requirements Doc](https://docs.google.com/document/d/1KAqduzY8ae3DYrSoCL1i23qHe95zJRYFulqMk-sGLWY/edit#)

[API Documentation](https://learn-2.galvanize.com/cohorts/3052/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/API_Overview.md)

# Components

## Product Details

![Product Detail Capture](https://user-images.githubusercontent.com/90647863/148652101-b046d871-32b3-45ed-8123-8ed1a3a62aaf.PNG)

Product Details displays the currently selected product:

- Image Gallery to scroll through all available images.
- Selected image display with zoom-in capabilities.
- Thumbnail images for each available style for the current product.
- Dropdown menus to select desired size and quantity to add to the cart.

## Related Items

Related Items displays the related items based on the current selected products and an outfit component:

- Two carousels: Top carousel displays related items, bottom carousel displays the users outfit.
- Each item's picture and name can be clicked to change the current product
- The add to outfit card holds a button that can be clicked to add the current outfit to the outfit list
- The outfit carousel keeps a user's outfit regardless of refresh or revisiting page
- Each item holds a button and the button's functionality changes depending on which list the item is in.
- The button renders a modal when clicked within the related items list
- The button deletes the item from the outfit list

## Questions & Answers

## Ratings and Reviews

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

Any time you are defining a color (or any other CSS property that should be shared across components), you can make a property in the THEMES object. If you need to add a property, you should add across all themes such that the themes (default, darkMode etc) all have the same structure.

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

These themes are them passed down to all the child components via a `ThemeProvider` Component. In this way we can easily change the theme prop in the top level component.

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
  color: ${(props) => props.theme.navbarText};
  background-color: ${(props) => props.theme.navbarBackground};
`;

//Use a styled component in your code
<Navbar />;
```

### Theme Colors

- ![#ecf0f1](https://via.placeholder.com/15/ecf0f1/000000?text=+) `#ecf0f1 - theme.bg`
- ![#f7f7f7](https://via.placeholder.com/15/f7f7f7/000000?text=+) `#f7f7f7 - theme.bgLight`
- ![#d3d9dd](https://via.placeholder.com/15/d3d9dd/000000?text=+) `#d3d9dd - theme.bgDark`
- ![#2c3e50](https://via.placeholder.com/15/2c3e50/000000?text=+) `#2c3e50 - theme.bgNav`
- ![#8e44ad](https://via.placeholder.com/15/8e44ad/000000?text=+) `#8e44ad - theme.graph`
- ![#c0392b](https://via.placeholder.com/15/c0392b/000000?text=+) `#c0392b - theme.error`
- ![#27ae60](https://via.placeholder.com/15/27ae60/000000?text=+) `#27ae60 - theme.success`
- ![#f1c40f](https://via.placeholder.com/15/f1c40f/000000?text=+) `#f1c40f - theme.warning`
- ![#2980b9](https://via.placeholder.com/15/2980b9/000000?text=+) `#2980b9 - theme.button`
- ![#f39c12](https://via.placeholder.com/15/f39c12/000000?text=+) `#f39c12 - theme.highlight`
- ![#333333](https://via.placeholder.com/15/333333/000000?text=+) `#333333 - theme.text`
- ![#f3f3f3](https://via.placeholder.com/15/f3f3f3/000000?text=+) `#f3f3f3 - theme.textInv`
- ![#666666](https://via.placeholder.com/15/666666/000000?text=+) `#666666 - theme.textLight`
- ![#111111](https://via.placeholder.com/15/111111/000000?text=+) `#111111 - theme.textDark`
- ![#2c3e50](https://via.placeholder.com/15/2c3e50/000000?text=+) `#2c3e50 - theme.textHeading`

### Shared Components

`Stars` Pass the star rating component a number. Anything <0 will round up to 0. Anything >5 will automatically round down to 5. Will round to nearest half-star. Size(px) and number will default to 24px and 0 if not set explicitly.

```HTML
import { Stars } from '../Shared/Stars'
<Stars number={5} size={24}>
```

`StarForm` will accept an initial number, a size for the entire element, and an onClick function.

```HTML
import { StarForm } from '../Shared/Stars'
<StarForm number={3.56} size={120} onClick={(e) => alert(e)} />
```

`Modal` The Modal componet sits on top of other HTML (z-index: 1) and will render whatever children are nested inside (see example). The component has a built in [x] (40x40px in the upper right). When clicked it will run the onClose function. Takes a default size that represents % of the DOM to cover. Default is 50, but will accept any value 10-90. Recommended usage:

1. Set state to `showing=false`.
2. Conditionally render modal on `showing`.
3. Pass the modal a function that updates the state to false when the user clicks the x.

```HTML
import { Stars } from '../Shared/Stars'
<Modal onClose={onClose} size={80}>
  <form action="/dosomething">
    ....
  </form>
<Modal>
```

Form Elements. `Input` `Dropdown` `Button` are standard input, select and button tags that are styled to be consistent. Usage is the same as any other HTML element in JSX.

```HTML
import { Input, Dropdown, Button } from '../Shared/Form'

<Input type='text' placeholder='Your text here'>
<Button onclick={something()}>Add a Review!</Button>
<Dropdown>
  <option value="1">{'Option 1'}</option>
</Dropdown>
```
