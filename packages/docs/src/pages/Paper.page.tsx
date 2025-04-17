// packages/docs/src/ComponentDocs.tsx
import React, { useState } from 'react';
import { createComponent } from '@lit/react';
import { AkPaper } from '@ak/components';
import {
  Title,
  Text,
  TextInput,
  Button,
  Stack,
  Paper,
  Code,
  Textarea,
  Grid,
  CopyButton,
} from '@mantine/core';
import { loremIpsumText, loremIpsumTitle } from '../constants';
import BackgroundSelector from '../components/BackgroundSelector';
import { ElementPreview } from '../components/ElementPreview';

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
  backgroundStyle?: 'solid' | 'gradient';
  solidColor?: string;
  gradientColor1?: string;
  gradientColor2?: string;
  gradientAngle?: number;
  gradientPercentage?: number;
}

const PaperComponent = createComponent({
  tagName: 'ak-paper',
  elementClass: AkPaper,
  react: React,
}) as any as React.FC<AkPaperProps>;

const ComponentDocs: React.FC = () => {
  const [title, setTitle] = useState<string>(loremIpsumTitle);
  const [text, setText] = useState<string>(loremIpsumText);
  const [backgroundStyle, setBackgroundStyle] = useState<'solid' | 'gradient'>(
    'solid'
  );
  const [solidColor, setSolidColor] = useState<string>('#fff');
  const [gradientColor1, setGradientColor1] = useState<string>('#fff');
  const [gradientColor2, setGradientColor2] = useState<string>('#ccc');
  const [gradientAngle, setGradientAngle] = useState<number>(90);
  const [gradientPercentage, setGradientPercentage] = useState<number>(50);

  const generatedHtml = `<ak-paper title="${title}" text="${text}" background-style="${backgroundStyle}" solid-color="${solidColor}" gradient-color1="${gradientColor1}" gradient-color2="${gradientColor2}" gradient-angle="${gradientAngle}" gradient-percentage="${gradientPercentage}"></ak-paper>`;

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
            <Grid.Col span={8}>
              <ElementPreview>
                <PaperComponent
                  title={title}
                  text={text}
                  backgroundStyle={backgroundStyle}
                  solidColor={solidColor}
                  gradientColor1={gradientColor1}
                  gradientColor2={gradientColor2}
                  gradientAngle={gradientAngle}
                  gradientPercentage={gradientPercentage}
                />
              </ElementPreview>
            </Grid.Col>
            <Grid.Col span={4}>
              <BackgroundSelector
                backgroundStyle={backgroundStyle}
                solidColor={solidColor}
                gradientColor1={gradientColor1}
                gradientColor2={gradientColor2}
                gradientAngle={gradientAngle}
                gradientPercentage={gradientPercentage}
                onBackgroundStyleChange={setBackgroundStyle}
                onSolidColorChange={setSolidColor}
                onGradientColor1Change={setGradientColor1}
                onGradientColor2Change={setGradientColor2}
                onGradientAngleChange={setGradientAngle}
                onGradientPercentageChange={setGradientPercentage}
              />
            </Grid.Col>
          </Grid>
        </Paper>
        <Stack>
          <Text size="lg">Generated HTML</Text>
          <Code block>{generatedHtml}</Code>
          <CopyButton value={generatedHtml} timeout={2000}>
            {({ copied, copy }) => (
              <Button color={copied ? 'teal' : 'blue'} onClick={copy}  w={"120px"} mt={10}>
                {copied ? 'Copied HTML' : 'Copy HTML'}
              </Button>
            )}
          </CopyButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ComponentDocs;
