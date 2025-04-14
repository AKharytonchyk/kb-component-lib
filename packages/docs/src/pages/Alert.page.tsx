// packages/docs/src/AlertDocs.tsx
import React, { useState } from 'react';
import { createComponent } from '@lit/react';
import { AkAlert } from '@ak/components';
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
  Switch,
  Textarea,
  ColorPicker,
  InputWrapper,
  Radio,
  Group,
  SegmentedControl,
} from '@mantine/core';
import { titleColors } from '../constants';
import BackgroundSelector, {
  BackgroundControlProps,
} from '../components/BackgroundSelector';

// Define the props interface for AkAlert
interface AkAlertProps {
  variant: 'filled' | 'light' | 'outline';
  color: string;
  title?: string;
  icon?: string;
  withCloseButton?: boolean;
  children?: React.ReactNode;
  backgroundStyle?: 'solid' | 'gradient';
  solidColor?: string;
  gradientColor1?: string;
  gradientColor2?: string;
  gradientAngle?: number;
  gradientPercentage?: number;
}

// Wrap the AkAlert Lit component for React usage
const AlertComponent = createComponent({
  tagName: 'ak-alert',
  elementClass: AkAlert,
  react: React,
}) as any as React.FC<AkAlertProps>;

const AlertDocs: React.FC = () => {
  const [variant, setVariant] = useState<'filled' | 'light' | 'outline'>(
    'light'
  );
  const [color, setColor] = useState('#ff922b');
  const [title, setTitle] = useState('Alert title');
  const [bodyContent, setBodyContent] = useState(
    'Lorem ipsum dolor sit, amet consectetur adipiscing elit. At officiis, quae tempore necessitatibus placeat saepe.'
  ); // Renamed from bodyText to bodyContent
  const [icon, setIcon] = useState('⚠');
  const [withCloseButton, setWithCloseButton] = useState(false);

  // backgrounControl
  const [backgroundStyle, setBackgroundStyle] =
    useState<BackgroundControlProps['backgroundStyle']>('solid');
  const [solidColor, setSolidColor] = useState('#ff922b');
  const [gradientColor1, setGradientColor1] = useState('#ff922b');
  const [gradientColor2, setGradientColor2] = useState('#ff922b');
  const [gradientAngle, setGradientAngle] = useState(0);
  const [gradientPercentage, setGradientPercentage] = useState(50);

  // Generate HTML string, including the body content as slotted content
  const generatedHtml = `<ak-alert 
  variant="${variant}"
  color="${color}"
  title="${title}"
  icon="${icon}" ${variant === 'filled' ? `backgroundStyle="${backgroundStyle}"` : ''}
  ${variant === 'filled' ? `solidColor="${solidColor}"` : ''}
  ${variant === 'filled' && backgroundStyle === 'gradient' ? `gradientColor1="${gradientColor1}"` : ''}
  ${variant === 'filled' && backgroundStyle === 'gradient' ? `gradientColor2="${gradientColor2}"` : ''}
  ${variant === 'filled' && backgroundStyle === 'gradient' ? `gradientAngle="${gradientAngle}"` : ''}
  ${withCloseButton ? `withCloseButton` : ''}
>
  <div slot="">${bodyContent}</div>
</ak-alert>`;

  // Function to copy HTML to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedHtml);
    alert('HTML copied to clipboard!');
  };

  return (
    <Stack p="md" style={{ maxWidth: 1640, minWidth: 800, margin: '0 auto' }}>
      <Title order={2} size="h3">
        Ak Alert Component
      </Title>

      <Grid>
        <Grid.Col span={8} style={{ backgroundColor: '#f5f5f5' }}>
          <Text size="lg">Preview</Text>
          <div style={{ position: 'sticky', top: 100 }}>
            <AlertComponent
              variant={variant}
              color={color}
              title={title}
              icon={icon}
              withCloseButton={withCloseButton}
              backgroundStyle={backgroundStyle}
              solidColor={solidColor}
              gradientColor1={gradientColor1}
              gradientColor2={gradientColor2}
              gradientAngle={gradientAngle}
              gradientPercentage={gradientPercentage}
            >
              <div slot="" dangerouslySetInnerHTML={{ __html: bodyContent }} />
            </AlertComponent>
          </div>
        </Grid.Col>

        <Grid.Col span={4}>
          <Text size="lg">Styles</Text>
          <Stack mt="md" gap={2}>
            <SegmentedControl
              data={[
                { value: 'filled', label: 'Filled' },
                { value: 'light', label: 'Light' },
                { value: 'outline', label: 'Outline' },
              ]}
              value={variant}
              onChange={(value) =>
                setVariant(value as 'filled' | 'light' | 'outline')
              }
            />
            {'filled' === variant ? (
              <BackgroundSelector
                backgroundStyle={backgroundStyle}
                solidColor={solidColor}
                gradientColor1={gradientColor1}
                gradientColor2={gradientColor2}
                gradientAngle={gradientAngle}
                onBackgroundStyleChange={setBackgroundStyle}
                onSolidColorChange={setSolidColor}
                onGradientColor1Change={setGradientColor1}
                onGradientColor2Change={setGradientColor2}
                onGradientAngleChange={setGradientAngle}
                onGradientPercentageChange={setGradientPercentage}
                gradientPercentage={gradientPercentage}
              />
            ) : (
              <InputWrapper
                label="Solid Color"
                description="Select the solid color for the alert"
              >
                <ColorPicker
                  value={color}
                  onChange={setColor}
                  format="hex"
                  swatches={titleColors}
                  withPicker={false}
                  style={{ marginTop: 10 }}
                />
              </InputWrapper>
            )}

            <Switch
              label="With Close Button"
              description="Show a close button on the alert"
              checked={withCloseButton}
              onChange={(e) => setWithCloseButton(e.currentTarget.checked)}
            />
          </Stack>
        </Grid.Col>
      </Grid>

      {/* Content Section */}
      <Paper withBorder p="md" mt="md">
        <Text size="lg">Content</Text>
        <Stack mt="md">
          <TextInput
            label="Title"
            description="Enter the alert title (optional)"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            placeholder="Alert title"
          />
          <Textarea
            label="Body Content"
            description="Enter the alert body content (can include HTML)"
            value={bodyContent}
            onChange={(e) => setBodyContent(e.currentTarget.value)}
            placeholder="Enter alert message"
            autosize
            minRows={2}
          />
          <TextInput
            label="Icon"
            description="Enter an emoji or character for the icon (optional)"
            value={icon}
            onChange={(e) => setIcon(e.currentTarget.value)}
            placeholder="⚠"
          />
        </Stack>
      </Paper>

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

export default AlertDocs;
