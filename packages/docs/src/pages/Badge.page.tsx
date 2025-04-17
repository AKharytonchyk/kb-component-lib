// packages/docs/src/BadgeDocs.tsx
import React, { useState } from 'react';
import { createComponent } from '@lit/react';
import { AkBadge } from '@ak/components';
import {
  Title,
  Text,
  Button,
  Stack,
  Paper,
  Code,
  Grid,
  Select,
  NumberInput,
  ColorPicker,
  InputWrapper,
  SegmentedControl,
  Input,
  CopyButton,
} from '@mantine/core';
import { titleColors } from '../constants';
import { ElementPreview } from '../components/ElementPreview';

// Define the props interface for AkBadge
interface AkBadgeProps {
  variant: 'filled' | 'light' | 'outline';
  color: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children?: React.ReactNode;
}

// Wrap the AkBadge Lit component for React usage
const BadgeComponent = createComponent({
  tagName: 'ak-badge',
  elementClass: AkBadge,
  react: React,
}) as any as React.FC<AkBadgeProps>;

const BadgeDocs: React.FC = () => {
  const [variant, setVariant] = useState<'filled' | 'light' | 'outline'>(
    'filled'
  );
  const [color, setColor] = useState('#228be6');
  const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  const [content, setContent] = useState('BADGE');

  // Generate HTML string
  const generatedHtml = `<ak-badge variant="${variant}" color="${color}" size="${size}">${content}</ak-badge>`;

  return (
    <Stack p="md" style={{ maxWidth: 1640, minWidth: 800, margin: '0 auto' }}>
      <Title order={2} size="h3">
        Ak Badge Component
      </Title>

      <Grid>
        {/* Preview Section */}
        <Grid.Col span={8}>
          <ElementPreview>
            <BadgeComponent variant={variant} color={color} size={size}>
              {content}
            </BadgeComponent>
          </ElementPreview>
        </Grid.Col>

        {/* Controls Section */}
        <Grid.Col span={4}>
          <Text size="lg">Styles</Text>
          <Stack mt="md" gap={2}>
            <InputWrapper
              label="Content"
              description="Enter the content for the badge"
            >
              <Input
                value={content}
                onChange={(e) => setContent(e.currentTarget.value)}
                placeholder="Enter badge content"
              />
            </InputWrapper>
            <Text size="sm" mt={10} mb={10}>
              Variant
            </Text>
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
            <InputWrapper label="Color" description="Choose the badge color">
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

      {/* Generated HTML Section */}
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

export default BadgeDocs;
