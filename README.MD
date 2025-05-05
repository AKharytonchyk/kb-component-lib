<script type="text/javascript" src="https://akharytonchyk.github.io/kb-component-lib/assets/lit-bundle.js"></script>

# KB Component Library

The KB Component Library is a collection of modern, customizable, and reusable web components built using the Lit framework. These components are designed to enhance the user experience of web applications, especially Knowledge Base (KB) pages, blogs, and other web projects.

## Features

- **Rich Variety**: Includes components like alerts, badges, cards, banners, and more.
- **Customizable**: Easily adjust colors, sizes, and other properties to match your design.
- **Lightweight**: Built with performance in mind using the Lit framework.
- **Easy Integration**: Add components to your project with a single script tag.

## Getting Started

To use the KB Component Library, include the following script in your HTML file:

```html
<script type="text/javascript" src="https://akharytonchyk.github.io/kb-component-lib/assets/lit-bundle.js"></script>
```

## Component Showcase

### Alert Component

The `ak-alert` component is used to display important messages to users. It supports different variants, colors, and icons.

```html
<ak-alert variant="filled" color="#ff922b" title="Important Notice" icon-type="warn">
  <div slot="">Ensure your data is backed up before migrating to the cloud.</div>
</ak-alert>
```
<ak-alert variant="filled" color="#ff922b" title="Important Notice" icon-type="warn">
  <div slot="">Ensure your data is backed up before migrating to the cloud.</div>
</ak-alert>

### Badge Component

The `ak-badge` component is used to highlight key information with a small, colored label.

```html
<ak-badge variant="filled" color="#228be6" radius="12px" size="md">Cloud</ak-badge>
<ak-badge variant="outline" color="#ff922b" radius="12px" size="sm">Beta</ak-badge>
```

### Card Component

The `ak-card` component is a versatile container for displaying content such as images, titles, and descriptions.

```html
<ak-card 
  image-url="https://picsum.photos/400/200" 
  title="Cloud Security Best Practices" 
  text="Learn how to secure your cloud infrastructure effectively." 
  button-text="Read More" 
  button-link="https://example.com/cloud-security">
</ak-card>
```

## Documentation

Visit the [documentation site](https://akharytonchyk.github.io/kb-component-lib/) to explore all components, configure them interactively, and copy the generated HTML for your projects.

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

