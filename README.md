# buoy
Accessible Vue.js UI component library

[![CircleCI](https://circleci.com/gh/fanappics/buoy/tree/master.svg?style=svg)](https://circleci.com/gh/fanappics/buoy/tree/master)

<img src="https://raw.githubusercontent.com/fanappics/buoy/master/buoylogo.png" alt="Buoy Logo" width="300" height="300">

## Goal

The Buoy project will create a beautiful, functional UI library for Vue.js that will make it easy for developers to follow the [Web Content Accessibility Guidelines guidelines](https://www.w3.org/WAI/intro/wcag).

## Principles

- https://vuetifyjs.com/ is an extremely well-built Vue UI library to use as a reference for building components.
- https://vuejs.org/v2/style-guide/ and the https://standardjs.com/ are two coding standards recommended for Vue.js code
- https://pattern-library.dequelabs.com is a resource for an accessible UI library we can use for an example of accessibility techniques.
- https://github.com/pa11y/pa11y is an accessibility-focused testing tool used in our CI process

## Living Style Guide and Documentation

This project uses [Vue Styleguidist](https://github.com/vue-styleguidist/vue-styleguidist) to maintain a living style guide
You can view the living style guide and documentation [here](https://fanappics.github.io/buoy/)

### Updating the style guide

1. When adding/updating a component you have [several options](https://github.com/vue-styleguidist/vue-styleguidist/blob/master/docs/Documenting.md)
   - JDoc as demonstrated in [b-header](./src/components/BHeader/BHeader.vue)
   - A [Readme.md](src/components/BButton/Readme.md) referenced in the `.vue` file
1. Run `npm run styleguide`
1. See the changes live at `localhost:6060`

To build and publish the new code the style guide run `npm run styleguide:build`

## CLI

running `npm i -g` will install the buoy CLI tool.
### Commands

| Command | Description |
|:---:|:---:|
| <code>buoy i &#124; init</code> | Create a new buoy.json file with default configuration |
| <code>buoy m &#124; make [name]</code> | Scaffold a new component using the `name` parameter |

### Configuration

The buoy.json located in the project root contains all configuration details.

#### make

```json
{
  "make": {
    "source": "stub",
    "target": "src/components"
  }
}
```

The source property is the directory to the templates used for scaffoldiong.  
The target property is the directory where the completed component source files are located.

Files in the source folder should have the proper file name with a .stub appended to the end.

In your source files or file names you can use `%stub%` as a placeholder for the component name.

For example:

If you have the file: `%name%.html.stub` with the contents

```html
<html>
<head>
  <title>%name%</title>
</head>
<body>
</body>
</html>
```

typing `buoy m checkbox` into the command line will create a file in the target folder `checkbox.html` with the contents

```html
<html>
<head>
  <title>checkbox</title>
</head>
<body>
</body>
</html>
```
