// packages/docs/src/CardDocs.tsx
import React, { useState } from 'react';
import { createComponent } from '@lit/react';
import { AkCard } from '@ak/components';
import {
  Title,
  Text,
  TextInput,
  Button,
  Stack,
  Paper,
  Code,
  Grid,
  Select,
  InputWrapper,
  ColorPicker,
  Textarea
} from '@mantine/core';
import { titleColors } from '../constants';
import { ElementPreview } from '../components/ElementPreview';

// Define the props interface for AkCard
interface AkCardProps {
  imageUrl: string;
  imageHeight: string;
  title: string;
  badgeText: string;
  titlePosition: 'top' | 'below';
  text: string;
  buttonText: string;
  buttonLink: string;
  badgeBackground: string;
  buttonBackground: string;
}

// Wrap the AkCard Lit component for React usage
const CardComponent = createComponent({
  tagName: 'ak-card',
  elementClass: AkCard,
  react: React,
}) as any as React.FC<AkCardProps>;

const CardDocs: React.FC = () => {
  const [imageUrl, setImageUrl] = useState('https://picsum.photos/400/200');
  const [imageHeight, setImageHeight] = useState('200px');
  const [title, setTitle] = useState('Norway Fjord Adventures');
  const [badgeText, setBadgeText] = useState('ON SALE');
  const [titlePosition, setTitlePosition] = useState<'top' | 'below'>('below');
  const [text, setText] = useState('With Fjord Tours you can explore more the magical fjord landscapes with tours and activities on and around the fjords of Norway');
  const [buttonText, setButtonText] = useState('Book classic tour now');
  const [buttonLink, setButtonLink] = useState('https://example.com/book-tour');
  const [badgeBackground, setBadgeBackground] = useState('#ff4081');
  const [buttonBackground, setButtonBackground] = useState('#1976d2');

  // Generate HTML string
  const generatedHtml = `
    <ak-card
      image-url="${imageUrl}"
      image-height="${imageHeight}"
      title="${title}"
      ${badgeText ? `badge-text="${badgeText}"` : ''}
      badge-background="${badgeBackground}"
      title-position="${titlePosition}"
      text="${text}"
      ${buttonText && buttonLink ? `button-text="${buttonText}" button-link="${buttonLink}"` : ''}
      button-background="${buttonBackground}"
    ></ak-card>
  `;

  // Function to copy HTML to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedHtml);
    alert('HTML copied to clipboard!');
  };

  return (
    <Stack p="md" style={{ maxWidth: 1640, minWidth: 800, margin: '0 auto' }}>
      <Title order={2} size="h3">
        Ak Card Component
      </Title>

      <Grid>
        {/* Preview Section */}
        <Grid.Col span={8}>
          <ElementPreview>
            <CardComponent
              imageUrl={imageUrl}
              imageHeight={imageHeight}
              title={title}
              badgeText={badgeText}
              titlePosition={titlePosition}
              text={text}
              buttonText={buttonText}
              buttonLink={buttonLink}
              badgeBackground={badgeBackground}
              buttonBackground={buttonBackground}
            />
          </ElementPreview>
        </Grid.Col>

        {/* Controls Section */}
        <Grid.Col span={4}>
          <Text size="lg">Styles</Text>
          <Stack mt="md" gap={2}>
            <TextInput
              label="Image URL"
              description="URL for the background image"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.currentTarget.value)}
              placeholder="https://picsum.photos/400/200"
            />
            <TextInput
              label="Image Height"
              description="Height of the image (e.g., 200px)"
              value={imageHeight}
              onChange={(e) => setImageHeight(e.currentTarget.value)}
              placeholder="200px"
            />
            <TextInput
              label="Title"
              description="Title of the card"
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
              placeholder="Norway Fjord Adventures"
            />
            <TextInput
              label="Badge Text"
              description="Text for the badge (leave empty to hide)"
              value={badgeText}
              onChange={(e) => setBadgeText(e.currentTarget.value)}
              placeholder="ON SALE"
            />
            <InputWrapper
              label="Badge Background Color"
              description="Select the badge background color"
            >
              <ColorPicker
                value={badgeBackground}
                onChange={(color) => setBadgeBackground(color)}
                format="hex"
                swatches={titleColors}
                withPicker={false}
                style={{ marginTop: 10 }}
              />
            </InputWrapper>
            <Select
              label="Title Position"
              description="Position of the title and badge"
              value={titlePosition}
              onChange={(value) => setTitlePosition(value as 'top' | 'below')}
              data={[
                { value: 'top', label: 'Above Image' },
                { value: 'below', label: 'Below Image' },
              ]}
            />
            <Textarea
              label="Text"
              description="Descriptive text for the card"
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
              placeholder="With Fjord Tours you can explore more..."
              minRows={3}
            />
            <TextInput
              label="Button Text"
              description="Text for the button (leave empty to hide)"
              value={buttonText}
              onChange={(e) => setButtonText(e.currentTarget.value)}
              placeholder="Book classic tour now"
            />
            <TextInput
              label="Button Link"
              description="URL for the button link"
              value={buttonLink}
              onChange={(e) => setButtonLink(e.currentTarget.value)}
              placeholder="https://example.com/book-tour"
            />
            <InputWrapper
              label="Button Background Color"
              description="Select the button background color"
            >
              <ColorPicker
                value={buttonBackground}
                onChange={(color) => setButtonBackground(color)}
                format="hex"
                swatches={titleColors}
                withPicker={false}
                style={{ marginTop: 10 }}
              />
            </InputWrapper>
          </Stack>
        </Grid.Col>
      </Grid>

      {/* Generated HTML Section */}
      <Paper withBorder p="md" mt="md">
        <Text size="lg">Generated HTML</Text>
        <Code block>{generatedHtml}</Code>
        <Button onClick={copyToClipboard} color="blue" mt="md">
          Copy HTML
        </Button>
      </Paper>
    </Stack>
  );
};

export default CardDocs;