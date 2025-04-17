// packages/docs/src/TimelineDocs.tsx
import React, { useState } from 'react';
import { createComponent } from '@lit/react';
import { AkTimeline } from '@ak/components';
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
  ColorPicker,
  InputWrapper,
  Group,
  ActionIcon,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { titleColors } from '../constants';
import { ElementPreview } from '../components/ElementPreview';

// Define the props interface for AkTimeline
interface AkTimelineProps {
  items: { title: string; description: string; date: string }[];
  lineColor: string;
  activeItems: number;
}

// Wrap the AkTimeline Lit component for React usage
const TimelineComponent = createComponent({
  tagName: 'ak-timeline',
  elementClass: AkTimeline,
  react: React,
}) as any as React.FC<AkTimelineProps>;

const TimelineDocs: React.FC = () => {
  const [lineColor, setLineColor] = useState('#228be6'); // Default to blue hex
  const [activeItems, setActiveItems] = useState(2);
  const [items, setItems] = useState([
    { title: 'New branch', description: 'You’ve created new branch fix-notifications from master', date: '2 hours ago' },
    { title: 'Commits', description: 'You’ve pushed 23 commits to fix-notifications branch', date: '52 minutes ago' },
    { title: 'Pull request', description: 'You’ve submitted a pull request Fix incorrect notification message (#187)', date: '54 minutes ago' },
    { title: 'Code review', description: 'Robert Gluesticker left a code review on your pull request', date: '12 minutes ago' },
  ]);

  // Add a new timeline item
  const addItem = () => {
    setItems([...items, { title: 'New Event', description: 'Description', date: 'Just now' }]);
  };

  // Remove a timeline item by index
  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
    if (activeItems > items.length - 1) {
      setActiveItems(items.length - 1);
    }
  };

  // Update a timeline item's field
  const updateItem = (index: number, field: 'title' | 'description' | 'date', value: string) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  // Generate HTML string
  const generatedHtml = `<ak-timeline line-color="${lineColor}" active-items="${activeItems}">
  ${items.map(item => `
    <div slot="item">
      <div slot="title">${item.title}</div>
      <div slot="description">${item.description}</div>
      <div slot="date">${item.date}</div>
    </div>
  `).join('')}
</ak-timeline>`;

  // Function to copy HTML to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedHtml);
    alert('HTML copied to clipboard!');
  };

  return (
    <Stack p="md" style={{ maxWidth: 1640, minWidth: 800, margin: '0 auto' }}>
      <Title order={2} size="h3">
        Ak Timeline Component
      </Title>

      <Grid>
        {/* Preview Section */}
        <Grid.Col span={8}>
          <ElementPreview>
            <TimelineComponent
              items={items}
              lineColor={lineColor}
              activeItems={activeItems}
            />
          </ElementPreview>
        </Grid.Col>

        {/* Controls Section */}
        <Grid.Col span={4}>
          <Text size="lg">Styles</Text>
          <Stack mt="md" gap={2}>
            <InputWrapper
              label="Line Color"
              description="Choose the color for the active timeline line"
            >
              <ColorPicker
                value={lineColor}
                onChange={setLineColor}
                withPicker={false}
                format="hex"
                swatches={titleColors}
                style={{ marginTop: 10 }}
              />
            </InputWrapper>
            <NumberInput
              label="Active Items"
              description="Number of items to mark as active (blue)"
              value={activeItems}
              onChange={(value) => setActiveItems(Number(value))}
              min={0}
              max={items.length}
              step={1}
            />
          </Stack>
        </Grid.Col>
      </Grid>

      {/* Content Section */}
      <Paper withBorder p="md" mt="md">
        <Text size="lg">Timeline Items</Text>
        <Stack mt="xs">
          {items.map((item, index) => (
            <Group key={index} align="flex-start" style={{ border: '1px solid #e0e0e0', padding: '16px', borderRadius: '4px' }}>
              <Group style={{ flex: '1 1 100%', width: '100%', alignItems: 'center' }}>
                <Text>Item {index + 1}:</Text>
                <ActionIcon color="red" onClick={() => removeItem(index)} ml="auto">
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
              <TextInput
                label="Title"
                value={item.title}
                onChange={(e) => updateItem(index, 'title', e.currentTarget.value)}
                placeholder="Enter title"
                style={{ flex: 1 }}
              />
              <TextInput
                label="Description"
                value={item.description}
                onChange={(e) => updateItem(index, 'description', e.currentTarget.value)}
                placeholder="Enter description"
                style={{ flex: 1 }}
              />
              <TextInput
                label="Date"
                value={item.date}
                onChange={(e) => updateItem(index, 'date', e.currentTarget.value)}
                placeholder="Enter date"
                style={{ flex: 1 }}
              />
            </Group>
          ))}
          <Button onClick={addItem} mt="md">
            Add Item
          </Button>
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

export default TimelineDocs;