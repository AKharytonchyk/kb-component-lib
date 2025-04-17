// packages/docs/src/HomeDocs.tsx
import React from 'react';
import { Title, Text, Stack, Paper, Code, List, Anchor } from '@mantine/core';

const HomeDocs: React.FC = () => {
  return (
    <Stack p="md" style={{ maxWidth: 1640, minWidth: 800, margin: '0 auto' }}>
      <Title order={1} size="h1" style={{ textAlign: 'center' }}>
        Welcome to the KB Component Library! 🎉
      </Title>

      <Paper withBorder p="md" mt="md">
        <Title order={2} size="h3">
          About This Page
        </Title>
        <Text mt="md">
          Hello and welcome to the KB Component Library documentation site! This is your go-to resource for exploring and configuring a variety of reusable UI components built with Lit. Our library offers a collection of components such as alerts, badges, action avatars, and timelines, designed to enhance your web applications with rich, interactive elements.
        </Text>
        <Text mt="md">
          What makes this library particularly valuable is its ability to bring dynamic and customizable components to Knowledge Base (KB) pages, which often lack such a variety of UI elements. Whether you’re building a KB page, a blog, or a full web application, you can use this site to configure components to your liking and then seamlessly integrate them into your projects.
        </Text>
      </Paper>

      <Paper withBorder p="md" mt="md">
        <Title order={2} size="h3">
          Guide: How to Use This Site
        </Title>
        <Text mt="md">
          This documentation site is designed to be interactive, allowing you to configure and preview components before using them in your own pages. Here’s how you can get started:
        </Text>
        <List mt="md" spacing="sm">
          <List.Item>
            <Text>
              <strong>Explore the Components</strong>: Use the navigation menu on the left to browse the available components, such as Alert, Badge, Action Avatar, and Timeline.
            </Text>
          </List.Item>
          <List.Item>
            <Text>
              <strong>Configure the Component</strong>: Each component page has a "Styles" section where you can adjust properties like color, size, and variant. Modify these controls to see the component update in real-time.
            </Text>
          </List.Item>
          <List.Item>
            <Text>
              <strong>Add Content (if applicable)</strong>: For components that support custom content (e.g., Timeline items, Alert messages), use the "Content" section to add or edit content such as titles, descriptions, or dates.
            </Text>
          </List.Item>
          <List.Item>
            <Text>
              <strong>Preview Your Changes</strong>: The component will be displayed in the preview area, showing how it looks with your customizations. This allows you to experiment until you find the perfect configuration.
            </Text>
          </List.Item>
          <List.Item>
            <Text>
              <strong>Copy the HTML</strong>: Once you’re happy with the component’s appearance, go to the "Generated HTML" section at the bottom of the page. Copy the HTML code to use in your own project.
            </Text>
            <Code block mt="xs">
              {`<ak-badge variant="filled" color="#228be6" radius="12px" size="md">BADGE</ak-badge>`}
            </Code>
          </List.Item>
          <List.Item>
            <Text>
              <strong>Integrate into Your Page</strong>: To use the component on your page, include the KB Component Library bundle via a script tag, then add the copied HTML to your project:
              <Code block mt="xs">
                {`<script src="https://akharytonchyk.github.io/kb-component-lib/assets/lit-bundle.js"></script>`}
              </Code>
              Then paste the component HTML into your page, such as a Knowledge Base page, to add rich UI elements where they’re typically not supported.
            </Text>
          </List.Item>
        </List>
        <Text mt="md">
          By following these steps, you can easily configure and use our components to enhance your web pages, especially for KB pages that often lack such a variety of interactive elements.
        </Text>
      </Paper>

      <Paper withBorder p="md" mt="md">
        <Title order={2} size="h3">
          Why Use KB Component Library?
        </Title>
        <Text mt="md">
          The KB Component Library is designed to simplify the process of adding modern, interactive UI elements to your web applications. Here are a few reasons to use our library:
        </Text>
        <List mt="md" spacing="sm">
          <List.Item>
            <Text>
              <strong>Rich Variety</strong>: From alerts and badges to action avatars and timelines, our library offers a diverse set of components to meet various UI needs.
            </Text>
          </List.Item>
          <List.Item>
            <Text>
              <strong>Customizable</strong>: Each component can be tailored to your needs with easy-to-use attributes, allowing you to match your project’s design.
            </Text>
          </List.Item>
          <List.Item>
            <Text>
              <strong>Perfect for KB Pages</strong>: Knowledge Base pages often lack dynamic UI elements. Our components bring interactivity and visual appeal to KB pages, making them more engaging for users.
            </Text>
          </List.Item>
          <List.Item>
            <Text>
              <strong>Easy Integration</strong>: With a single script tag and simple HTML, you can add our components to any web page, whether it’s a KB page, a blog, or a full application.
            </Text>
          </List.Item>
        </List>
        <Text mt="md">
          Start exploring the components today and bring your web pages to life! Visit the documentation pages for each component to configure and preview them, then copy the HTML to use in your projects.
        </Text>
        <Text mt="md">
          Need help or have feedback? Reach out to us at{' '}
          <Anchor href="mailto:support@example.com">support@example.com</Anchor>.
        </Text>
      </Paper>
    </Stack>
  );
};

export default HomeDocs;