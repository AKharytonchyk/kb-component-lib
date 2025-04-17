// packages/docs/src/ActionAvatarDocs.tsx
import React, { useState } from 'react';
import { createComponent } from '@lit/react';
import { AkActionAvatar } from '@ak/components';
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
  ColorPicker,
  InputWrapper,
  SegmentedControl,
  CopyButton,
} from '@mantine/core';
import { titleColors } from '../constants';
import { ElementPreview } from '../components/ElementPreview';

// Define the props interface for AkActionAvatar
interface AkActionAvatarProps {
  image: string;
  text: string;
  icon: 'phone' | 'person' | 'email' | 'play' | '';
  additionalText: string;
  link: string;
  color: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

// Wrap the AkActionAvatar Lit component for React usage
const ActionAvatarComponent = createComponent({
  tagName: 'ak-action-avatar',
  elementClass: AkActionAvatar,
  react: React,
}) as any as React.FC<AkActionAvatarProps>;

const ActionAvatarDocs: React.FC = () => {
  const [image, setImage] = useState('https://picsum.photos/id/237/200/300');
  const [text, setText] = useState('John Doe');
  const [icon, setIcon] = useState<'phone' | 'person' | 'email' | 'play' | ''>(
    ''
  );
  const [additionalText, setAdditionalText] = useState('Wouf Wouf');
  const [link, setLink] = useState('');
  const [color, setColor] = useState('#228be6'); // Default to blue hex
  const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');

  // Generate HTML string
  const generatedHtml = `<ak-action-avatar${
    image ? ` image="${image}"` : ''
  }${text ? ` text="${text}"` : ''}${icon ? ` icon="${icon}"` : ''}${
    additionalText ? ` additional-text="${additionalText}"` : ''
  }${link ? ` link="${link}"` : ''} color="${color}" size="${size}"></ak-action-avatar>`;

  return (
    <Stack p="md" style={{ maxWidth: 1640, minWidth: 800, margin: '0 auto' }}>
      <Title order={2} size="h3">
        Ak Action Avatar Component
      </Title>

      <Grid>
        {/* Preview Section */}
        <Grid.Col span={8}>
          <ElementPreview>
            <ActionAvatarComponent
              image={image}
              text={text}
              icon={icon}
              additionalText={additionalText}
              link={link}
              color={color}
              size={size}
            />
          </ElementPreview>
        </Grid.Col>

        {/* Controls Section */}
        <Grid.Col span={4}>
          <Text size="lg">Styles</Text>
          <Stack mt="md" gap={2}>
            <SegmentedControl
              data={[
                { value: '', label: 'None' },
                { value: 'phone', label: 'Phone' },
                { value: 'person', label: 'Person' },
                { value: 'email', label: 'Email' },
                { value: 'play', label: 'Play' },
              ]}
              value={icon}
              onChange={(value) =>
                setIcon(value as 'phone' | 'person' | 'email' | 'play' | '')
              }
            />
            <InputWrapper label="Color" description="Choose the avatar color">
              <ColorPicker
                value={color}
                onChange={setColor}
                withPicker={false}
                format="hex"
                swatches={titleColors}
                style={{ marginTop: 10 }}
              />
            </InputWrapper>
            <Text size="sm" mt={10} mb={10}>
              Size
            </Text>
            <SegmentedControl
              data={[
                { value: 'xs', label: 'XS' },
                { value: 'sm', label: 'SM' },
                { value: 'md', label: 'MD' },
                { value: 'lg', label: 'LG' },
                { value: 'xl', label: 'XL' },
              ]}
              value={size}
              onChange={(value) =>
                setSize(value as 'xs' | 'sm' | 'md' | 'lg' | 'xl')
              }
            />
          </Stack>
        </Grid.Col>
      </Grid>

      {/* Content Section */}
      <Paper withBorder p="md" mt="md">
        <Text size="lg">Content</Text>
        <Stack mt="md">
          <TextInput
            label="Image URL"
            description="Enter the avatar image URL (optional)"
            value={image}
            onChange={(e) => setImage(e.currentTarget.value)}
            placeholder="https://example.com/avatar.jpg"
          />
          <TextInput
            label="Text"
            description="Enter text to generate initials (optional)"
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            placeholder="John Doe"
          />
          <TextInput
            label="Additional Text"
            description="Enter additional text (optional)"
            value={additionalText}
            onChange={(e) => setAdditionalText(e.currentTarget.value)}
            placeholder="Contact Us"
          />
          <TextInput
            label="Link URL"
            description="Enter the link URL (optional)"
            value={link}
            onChange={(e) => setLink(e.currentTarget.value)}
            placeholder="https://example.com"
          />
        </Stack>
      </Paper>

      {/* Generated HTML Section */}
      <Paper withBorder p="md" mt="md">
        <Text size="lg">Generated HTML</Text>
        <Code block>{generatedHtml}</Code>
        <CopyButton value={generatedHtml} timeout={2000}>
          {({ copied, copy }) => (
            <Button color={copied ? 'teal' : 'blue'} onClick={copy} w={"120px"} mt={10}>
              {copied ? 'Copied HTML' : 'Copy HTML'}
            </Button>
          )}
        </CopyButton>
      </Paper>
    </Stack>
  );
};

export default ActionAvatarDocs;
