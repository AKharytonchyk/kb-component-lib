// packages/docs/src/AccordionDocs.tsx
import React, { useState } from 'react';
import { createComponent } from '@lit/react';
import { AkAccordion } from '@ak/components';
import {
  Title,
  Text,
  TextInput,
  Button,
  Stack,
  Paper,
  Code,
  Group,
  ActionIcon,
  ColorPicker,
  InputWrapper,
  Grid,
  Switch,
  Textarea,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import {
  backgroundColors,
  loremIpsumText,
  loremIpsumTitle,
  titleColors,
} from '../constants';
import { ElementPreview } from '../components/ElementPreview';

// Define the props interface for AkAccordion
interface AkAccordionProps {
  items: { title: string; text?: string; md?: string }[];
  headerBackground?: string;
  titleColor?: string;
}

// Wrap the AkAccordion Lit component for React usage
const AccordionComponent = createComponent({
  tagName: 'ak-accordion',
  elementClass: AkAccordion,
  react: React,
}) as any as React.FC<AkAccordionProps>;

const AccordionDocs: React.FC = () => {
  const [items, setItems] = useState([
    { title: loremIpsumTitle, text: loremIpsumText },
    {
      title: 'Item with links',
      text: loremIpsumText,
      links: [{ text: 'Link 1', href: 'https://example.com' }],
    },
    {
      title: 'MD Item 1',
      md: 'This is **bold** text with a [link](https://example.com).',
    },
    {
      title: 'MD Item 2',
      md: '- Item one\n- Item two\n- [Click me](https://example.com)',
    },
  ]);

  const [headerBackground, setHeaderBackground] = useState('#f9f9f9');
  const [titleColor, setTitleColor] = useState('#000');
  const [useMarkdown, setUseMarkdown] = useState(items.map(({ md }) => !!md));

  const addItem = () => {
    setItems([...items, { title: 'New Item', text: 'New content goes here.' }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (
    index: number,
    field: 'title' | 'text' | 'md',
    value: string
  ) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const updateItemLinks = (
    index: number,
    field: 'links',
    value: { text: string; href: string }[]
  ) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const generatedHtml = `<ak-accordion items='${JSON.stringify(items)}' header-background="${headerBackground}"  title-color="${titleColor}" ></ak-accordion>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedHtml);
    alert('HTML copied to clipboard!');
  };

  return (
    <Stack p="md" style={{ maxWidth: 1640, minWidth: 800, margin: '0 auto' }}>
      <Title order={2} size="h3">
        Ak Accordion Component
      </Title>

      <Grid>
        <Grid.Col span={8}>
          <ElementPreview>
            <AccordionComponent
              items={items}
              headerBackground={headerBackground}
              titleColor={titleColor}
            />
          </ElementPreview>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text size="lg">Styles</Text>
          <Stack mt="md" gap={16}>
            <InputWrapper
              label="Header Background Color"
              description="Select the background color for accordion headers"
            >
              <ColorPicker
                value={headerBackground}
                onChange={setHeaderBackground}
                withPicker={false}
                format="hex"
                swatches={backgroundColors}
              />
            </InputWrapper>
            <InputWrapper
              label="Title Color"
              description="Select the color for the accordion titles"
            >
              <ColorPicker
                value={titleColor}
                onChange={setTitleColor}
                withPicker={false}
                format="hex"
                swatches={[...titleColors, '#fff']}
              />
            </InputWrapper>
          </Stack>
        </Grid.Col>
      </Grid>
      <Paper withBorder p="md">
        <Text size="lg">Accordion Items</Text>
        <Stack mt="xs">
          {items.map((item, index) => (
            <Group
              key={index}
              align="flex-start"
              style={{
                border: '1px solid #e0e0e0',
                padding: '16px',
                borderRadius: '4px',
              }}
            >
              <Group
                style={{
                  flex: '1 1 100%',
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <Text>Item {index + 1}:</Text>

                <ActionIcon
                  color="red"
                  onClick={() => removeItem(index)}
                  ml="auto"
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
              <Group
                align="center"
                style={{ flex: '1 1 100%', width: '100%', alignItems: 'end' }}
              >
                <TextInput
                  label={`Title`}
                  value={item.title}
                  onChange={(e) =>
                    updateItem(index, 'title', e.currentTarget.value)
                  }
                  placeholder="Enter title"
                  style={{ flex: 1 }}
                />
                <Switch
                  onLabel="MD"
                  offLabel="Text"
                  onChange={() =>
                    setUseMarkdown((prev) =>
                      prev.map((v, i) => (i !== index ? v : !v))
                    )
                  }
                  checked={useMarkdown[index]}
                  size="xl"
                />
              </Group>

              <Textarea
                label={`Text`}
                value={useMarkdown[index] ? item.md || '' : item.text || ''}
                autosize
                minRows={2}
                onChange={(e) =>
                  updateItem(
                    index,
                    useMarkdown ? 'md' : 'text',
                    e.currentTarget.value
                  )
                }
                placeholder="Enter text"
                style={{ flex: 1 }}
              />
              {!useMarkdown[index] && (
                <Stack style={{ width: '100%' }}>
                  <Text size="sm">Links</Text>
                  {item.links?.map((link, linkIndex) => (
                    <Group
                      key={linkIndex}
                      align="end"
                      style={{ width: '100%' }}
                    >
                      <TextInput
                        label="Name"
                        value={link.text}
                        onChange={(e) =>
                          updateItemLinks(index, 'links', [
                            ...(item.links || []).map((l, i) =>
                              i === linkIndex
                                ? { ...l, text: e.currentTarget.value }
                                : l
                            ),
                          ])
                        }
                        placeholder="Enter link name"
                        style={{ flex: 1 }}
                      />
                      <TextInput
                        label="Href"
                        value={link.href}
                        onChange={(e) =>
                          updateItemLinks(index, 'links', [
                            ...(item.links || []).map((l, i) =>
                              i === linkIndex
                                ? { ...l, href: e.currentTarget.value }
                                : l
                            ),
                          ])
                        }
                        placeholder="Enter link URL"
                        style={{ flex: 2 }}
                      />
                      <ActionIcon
                        color="red"
                        onClick={() =>
                          updateItemLinks(
                            index,
                            'links',
                            item.links?.filter((_, i) => i !== linkIndex)
                          )
                        }
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  ))}
                  <Button
                    fullWidth
                    onClick={() =>
                      updateItemLinks(index, 'links', [
                        ...(item.links || []),
                        { text: '', href: '' },
                      ])
                    }
                  >
                    Add Link
                  </Button>
                </Stack>
              )}
            </Group>
          ))}
          <Button onClick={addItem} mt="md">
            Add Item
          </Button>
        </Stack>
      </Paper>
      <Paper withBorder p="md">
        <Text size="lg">Generated HTML</Text>
        <Code block>{generatedHtml}</Code>
        <Button onClick={copyToClipboard} color="blue" mt="md">
          Copy HTML
        </Button>
      </Paper>
    </Stack>
  );
};

export default AccordionDocs;
