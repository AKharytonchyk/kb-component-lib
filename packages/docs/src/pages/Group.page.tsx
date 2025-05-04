// packages/docs/src/GroupDocs.tsx
import React, { useState } from 'react';
import { createComponent } from '@lit/react';
import { AkFlexGroup, AkGridGroup } from '@ak/components';
import {
  Title,
  Text,
  TextInput,
  Button,
  Stack,
  Paper,
  Code,
  Grid,
  NumberInput,
  Textarea,
} from '@mantine/core';
import { ElementPreview } from '../components/ElementPreview';

interface AkFlexGroupProps {
  gap: string;
  children: React.ReactNode;
}

interface AkGridGroupProps {
  columns: number;
  gap: string;
  children: React.ReactNode;
}

const FlexGroupComponent = createComponent({
  tagName: 'ak-flex-group',
  elementClass: AkFlexGroup,
  react: React,
}) as any as React.FC<AkFlexGroupProps>;

const GridGroupComponent = createComponent({
  tagName: 'ak-grid-group',
  elementClass: AkGridGroup,
  react: React,
}) as any as React.FC<AkGridGroupProps>;

const whiteRectDiv = `
  <div style="background: #fff; padding: 16px; text-align: center; min-height: 100px; border-radius: 4px;">
    <span style="color: #000; font-size: 16px;">Preview</span>
  </div>
`.trim();

const GroupDocs: React.FC = () => {
  // Flex Group state
  const [flexGap, setFlexGap] = useState('16px');
  const [flexItemsHtml, setFlexItemsHtml] = useState(
    [1, 2, 3].map(() => whiteRectDiv).join('\n')
  );

  // Grid Group (Fixed) state
  const [fixedColumns, setFixedColumns] = useState(3);
  const [fixedGap, setFixedGap] = useState('16px');
  const [fixedItemsHtml, setFixedItemsHtml] = useState(
    `
<ak-alert variant="filled" color="#ff922b" title="Alert 1" icon-type="warn">
  <div slot="">This is an alert message.</div>
</ak-alert>
<ak-paper title="Paper 1" text="This is a paper component."></ak-paper>
<ak-badge variant="filled" color="#228be6" radius="12px" size="md">BADGE</ak-badge>
<ak-alert variant="filled" color="#228be6" title="Alert 2" icon-type="info">
  <div slot="">Another alert message.</div>
</ak-alert>
<ak-paper title="Paper 2" text="Another paper component."></ak-paper>
<ak-badge variant="filled" color="#ff922b" radius="12px" size="md">BADGE 2</ak-badge>
  `.trim()
  );

  // Function to copy HTML to clipboard
  const copyToClipboard = (html: string) => {
    navigator.clipboard.writeText(html);
    alert('HTML copied to clipboard!');
  };

  // Render items for preview
  const renderFlexItems = () => (
    <div
      slot="wrapper"
      dangerouslySetInnerHTML={{
        __html:
          flexItemsHtml ||
          '<div style="background: #f0f0f0; padding: 16px; text-align: center;">Preview</div>',
      }}
    />
  );

  const renderFixedItems = () => (
    <div
      slot="wrapper"
      dangerouslySetInnerHTML={{
        __html:
          fixedItemsHtml ||
          '<div style="background: #f0f0f0; padding: 16px; text-align: center;">Preview</div>',
      }}
    />
  );

  // Generate HTML strings for each variant
  const flexGroupHtml = `
  <ak-flex-group gap="${flexGap}">
    <div slot="wrapper" class="wrapper">
      ${flexItemsHtml}
    </div>
  </ak-flex-group>
  `;

  const fixedGroupHtml = `
  <ak-grid-group columns="${fixedColumns}" gap="${fixedGap}">
    <div slot="wrapper" class="wrapper">
      ${fixedItemsHtml}
    </div>
  </ak-grid-group>
  `;

  return (
    <Stack p="md" style={{ maxWidth: 1640, minWidth: 800, margin: '0 auto' }}>
      <Title order={2} size="h3">
        Ak Group Components
      </Title>

      {/* Flex Group Section */}
      <Paper withBorder p="md" mt="md">
        <Title order={3} size="h4">
          ak-flex-group (Flex Row Layout)
        </Title>
        <Grid mt="md">
          <Grid.Col span={8}>
            <ElementPreview>
              <FlexGroupComponent gap={flexGap}>
                {renderFlexItems()}
              </FlexGroupComponent>
            </ElementPreview>
          </Grid.Col>
          <Grid.Col span={4}>
            <Text size="lg">Styles</Text>
            <Stack mt="md" gap={2}>
              <TextInput
                label="Gap"
                description="Gap between items (e.g., 16px)"
                value={flexGap}
                onChange={(e) => setFlexGap(e.currentTarget.value)}
                placeholder="16px"
              />
            </Stack>
          </Grid.Col>
        </Grid>
        <Text mt="md" size="lg">
          Items (Paste Lit Component HTML)
        </Text>
        <Stack mt="xs">
          <Textarea
            label="Components HTML"
            description="Paste the HTML for your Lit components (e.g., <ak-alert>, <ak-paper>)"
            value={flexItemsHtml}
            onChange={(e) => setFlexItemsHtml(e.currentTarget.value)}
            placeholder="<ak-alert variant='filled' color='#ff922b' title='Alert'>...</ak-alert>"
            rows={5}
          />
        </Stack>
        <Text mt="md" size="lg">
          Generated HTML
        </Text>
        <Code block>{flexGroupHtml}</Code>
        <Button
          onClick={() => copyToClipboard(flexGroupHtml)}
          color="blue"
          mt="md"
        >
          Copy HTML
        </Button>
      </Paper>

      {/* Grid Group (Fixed) Section */}
      <Paper withBorder p="md" mt="md">
        <Title order={3} size="h4">
          ak-grid-group (Fixed Grid Layout)
        </Title>
        <Grid mt="md">
          <Grid.Col span={8}>
            <ElementPreview>
              <GridGroupComponent columns={fixedColumns} gap={fixedGap}>
                {renderFixedItems()}
              </GridGroupComponent>
            </ElementPreview>
          </Grid.Col>
          <Grid.Col span={4}>
            <Text size="lg">Styles</Text>
            <Stack mt="md" gap={2}>
              <NumberInput
                label="Columns"
                description="Number of columns per row"
                value={fixedColumns}
                onChange={(value) => setFixedColumns(Number(value))}
                min={1}
                step={1}
              />
              <TextInput
                label="Gap"
                description="Gap between items (e.g., 16px)"
                value={fixedGap}
                onChange={(e) => setFixedGap(e.currentTarget.value)}
                placeholder="16px"
              />
            </Stack>
          </Grid.Col>
        </Grid>
        <Text mt="md" size="lg">
          Items (Paste Lit Component HTML)
        </Text>
        <Stack mt="xs">
          <Textarea
            label="Components HTML"
            description="Paste the HTML for your Lit components (e.g., <ak-alert>, <ak-paper>)"
            value={fixedItemsHtml}
            onChange={(e) => setFixedItemsHtml(e.currentTarget.value)}
            placeholder="<ak-alert variant='filled' color='#ff922b' title='Alert'>...</ak-alert>"
            rows={5}
          />
        </Stack>
        <Text mt="md" size="lg">
          Generated HTML
        </Text>
        <Code block>{fixedGroupHtml}</Code>
        <Button
          onClick={() => copyToClipboard(fixedGroupHtml)}
          color="blue"
          mt="md"
        >
          Copy HTML
        </Button>
      </Paper>
    </Stack>
  );
};

export default GroupDocs;
