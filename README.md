# buoy

![Buoy logo](./buoylogo.png)

Accessible Vue.js UI library

## Goals

The goal of the Buoy project is to create a beautiful, functional UI library for Vue.js that makes it easy for developers to follow the [Web Content Accessibility Guidelines guidelines](https://www.w3.org/WAI/intro/wcag).

https://pattern-library.dequelabs.com is a resource for an accessible UI library we can use for an example of accessibility techniques.

https://vuetifyjs.com/ is an extremely well-built Vue UI library to use as a reference for building components.

This project follows the Vue style guide: https://vuejs.org/v2/style-guide/ and the https://standardjs.com/ style guide.

## CLI

running `npm i -g` will install the buoy CLI tool.
### Commands

| Command | Description |
| --- | --- |
| buoy i &#124; init | Create a new buoy.json file with default configureation |
| buoy m &#124; make [mame] | Scaffold a new component using the name parameter |

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
