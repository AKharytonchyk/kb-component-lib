// packages/docs/src/BannerDocs.tsx
import React, { useState } from 'react';
import { createComponent } from '@lit/react';
import { AkBanner } from '@ak/components';
import {
  Title,
  Text,
  TextInput,
  Button,
  Stack,
  Paper,
  Code,
  Grid,
  Textarea,
  Slider,
  Group,
  Switch,
  CopyButton,
} from '@mantine/core';
import { loremIpsumText, loremIpsumTitle } from '../constants';

interface AkBannerProps {
  backgroundImage: string;
  title?: string;
  text?: string;
  link?: string;
  linkText?: string;
  bannerHeight?: number;
  parallax: boolean;
}

const BannerComponent = createComponent({
  tagName: 'ak-banner',
  elementClass: AkBanner,
  react: React,
}) as any as React.FC<AkBannerProps>;

const BannerDocs: React.FC = () => {
  const [backgroundImage, setBackgroundImage] = useState(
    'https://picsum.photos/1280/1280'
  );
  const [title, setTitle] = useState(loremIpsumTitle);
  const [text, setText] = useState(loremIpsumTitle);
  const [link, setLink] = useState('');
  const [linkText, setLinkText] = useState('Learn More');
  const [bannerHeight, setBannerHeight] = useState(400);
  const [parallax, setParallax] = useState(true);

  const generatedHtml = `<ak-banner${
    backgroundImage ? ` background-image="${backgroundImage}"` : ''
  }${title ? ` title="${title}"` : ''}${text ? ` text="${text}"` : ''}${
    link ? ` link="${link}"` : ''
  }${linkText ? ` link-text="${linkText}"` : ''} banner-height="${bannerHeight}" paralax="${parallax}"></ak-banner>`;

  return (
    <Stack p="md" style={{ maxWidth: 1640, minWidth: 800, margin: '0 auto' }}>
      <Title order={2} size="h3">
        Ak Banner Component
      </Title>

      <Grid>
        <Grid.Col span={6}>
          <Text size="lg">Configure Banner</Text>
          <Stack mt="md">
            <TextInput
              label="Background Image URL"
              description="Enter a valid image URL (e.g., https://example.com/image.jpg)"
              value={backgroundImage}
              onChange={(e) => setBackgroundImage(e.currentTarget.value)}
              placeholder="https://example.com/image.jpg"
            />
            <TextInput
              label="Title"
              description="Enter the banner title (optional)"
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
              placeholder="Welcome to Our Site"
            />
            <Textarea
              label="Text"
              description="Enter descriptive text (optional)"
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
              placeholder="Discover amazing features and more."
              autosize
              minRows={2}
            />
          </Stack>
        </Grid.Col>{' '}
        <Grid.Col span={6}>
          <Text size="lg">&nbsp;</Text>
          <Stack mt="md">
            <TextInput
              label="Link URL"
              description="Enter the link URL (optional)"
              value={link}
              onChange={(e) => setLink(e.currentTarget.value)}
              placeholder="https://example.com/learn-more"
            />
            <TextInput
              label="Link Text"
              description="Enter the link text (defaults to 'Learn More')"
              value={linkText}
              onChange={(e) => setLinkText(e.currentTarget.value)}
              placeholder="Explore Now"
            />
            <Switch
              checked={parallax}
              onLabel="On"
              offLabel="Off"
              onChange={(e) => setParallax(e.currentTarget.checked)}
              label="Enable Parallax"
            />
            <Text size="sm">Height</Text>
            <Slider
              label={(value) => `${value}px`}
              value={bannerHeight}
              onChange={setBannerHeight}
              min={100}
              max={800}
              step={10}
              marks={[
                { value: 100, label: '100px' },
                { value: 400, label: '400px' },
                { value: 800, label: '800px' },
              ]}
            />
          </Stack>
        </Grid.Col>
      </Grid>

      <Text size="lg">Wide Preview</Text>
      <BannerComponent
        backgroundImage={backgroundImage}
        title={title}
        text={text}
        link={link}
        linkText={linkText}
        bannerHeight={bannerHeight}
        parallax={parallax}
      />
      <Paper withBorder p="md" mt="md">
        <Text size="lg">Generated HTML</Text>
        <Code block>{generatedHtml}</Code>
        <CopyButton value={generatedHtml} timeout={2000}>
          {({ copied, copy }) => (
            <Button color={copied ? 'teal' : 'blue'} onClick={copy}  w={"120px"} mt={10}>
              {copied ? 'Copied HTML' : 'Copy HTML'}
            </Button>
          )}
        </CopyButton>
      </Paper>
    </Stack>
  );
};

export default BannerDocs;
