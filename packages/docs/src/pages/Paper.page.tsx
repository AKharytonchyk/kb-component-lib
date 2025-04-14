// packages/docs/src/ComponentDocs.tsx
import React, { useState } from 'react';
import { createComponent } from '@lit/react';
import { AkPaper } from '@ak/components';
import {
  Title,
  Text,
  TextInput,
  Checkbox,
  ColorPicker,
  Button,
  Stack,
  Paper,
  Code,
  Textarea,
  Grid,
  InputWrapper,
} from '@mantine/core';
import { backgroundColors, loremIpsumText, loremIpsumTitle, textColors, titleColors } from '../constants';

export interface AkPaperProps {
  title?: string;
  text?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
  padding?: string;
  shadow?: boolean;
  titleColor?: string;
  textColor?: string;
}

const PaperComponent = createComponent({
  tagName: 'ak-paper',
  elementClass: AkPaper,
  react: React,
}) as any as React.FC<AkPaperProps>;

const colors = [
  // Whites and Light Grays
  '#FFFFFF', // White
  '#FBFAFA', // Snow
  '#F6F6F6', // Grey 1
  '#EFEFEF', // Grey 2
  '#BDBDBD', // Grey 3

  // Dark Grays and Blacks
  '#6C6C6C', // Grey 4
  '#4B4B4B', // Grey 5
  '#2F2F2F', // Grey 6
  '#222222', // Graphite
  '#060606', // Night

  // Yellows and Oranges
  '#FFC000', // Yellow
  '#F58041', // Orange

  // Reds and Pinks
  '#F15D45', // Coral
  '#B896FF', // Lilac

  // Blues and Teals
  '#76CDD8', // EPAM Blue
  '#ABDBDD', // Light Blue
  '#0091AC', // Teal
  '#0078C2', // Aqua
  '#0047FF', // Cobalt
  '#4A71BD', // Slate
  '#7BA8FF', // Sky

  // Purples
  '#8453D2', // Iris

  // Greens and Mints
  '#00FFF0', // Mint
  '#00F6FF', // Sea

  // Navy
  '#10303E', // Navy
];

const ComponentDocs: React.FC = () => {
  const [title, setTitle] = useState<string>(loremIpsumTitle);
  const [text, setText] = useState<string>(loremIpsumText);
  const [color, setColor] = useState<string>('#fff');
  const [shadow, setShadow] = useState<boolean>(false);

  const [titleColor, setTitleColor] = useState<string>('#000');
  const [textColor, setTextColor] = useState<string>('#000');
  const [backgroundColor, setBackgroundColor] = useState<string>('#fff');

  const generatedHtml = `<ak-paper title="${title}" text="${text}" color="${color}"${shadow ? ' shadow' : ''}></ak-paper>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedHtml);
    alert('HTML copied to clipboard!');
  };

  return (
    <Stack p="md" style={{ maxWidth: 800, margin: '0 auto' }}>
      <Stack gap={16}>
        <Title order={2} size="h3">
          Ak Paper Component
        </Title>

        <Stack gap={16}>
          <TextInput
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            placeholder="Enter title"
          />
          <Textarea
            label="Text"
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            placeholder="Enter text"
            minRows={4}
            autosize
          />
        </Stack>
        <Paper>
          <Grid>
            <Grid.Col
              span={8}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <PaperComponent
                title={title}
                text={text}
                shadow={shadow}
                titleColor={titleColor}
                textColor={textColor}
                backgroundColor={backgroundColor}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Stack p={10} gap={16}>
                <InputWrapper
                  label="Title Color"
                  description="Select the color for the title text"
                >
                  <ColorPicker
                    value={titleColor}
                    onChange={setTitleColor}
                    withPicker={false}
                    format="hex"
                    swatches={titleColors}
                  />
                </InputWrapper>
                <InputWrapper
                  label="Text Color"
                  description="Select the text color for the paper"
                >
                  <ColorPicker
                    value={textColor}
                    onChange={setTextColor}
                    withPicker={false}
                    format="hex"
                    swatches={textColors}
                  />
                </InputWrapper>
                <InputWrapper
                  label="Background Color"
                  description="Select the background color for the paper"
                >
                  <ColorPicker
                    value={backgroundColor}
                    onChange={setBackgroundColor}
                    withPicker={false}
                    format="hex"
                    swatches={backgroundColors}
                  />
                </InputWrapper>

                <InputWrapper>
                  <Checkbox
                    label="Shadow"
                    checked={shadow}
                    onChange={(e) => setShadow(e.currentTarget.checked)}
                  />
                </InputWrapper>
              </Stack>
            </Grid.Col>
          </Grid>
        </Paper>
        <Stack>
          <Text size="lg">Generated HTML</Text>
          <Code block>{generatedHtml}</Code>
          <Button onClick={copyToClipboard} color="blue">
            Copy HTML
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ComponentDocs;
