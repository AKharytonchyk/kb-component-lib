import React, { useMemo } from 'react';
import {
  ColorPicker,
  InputWrapper,
  Stack,
  SegmentedControl,
  AngleSlider,
  Slider,
  Group,
} from '@mantine/core';
import { backgroundColors, titleColors } from '../constants';

export interface BackgroundControlProps {
  backgroundStyle: 'solid' | 'gradient';
  solidColor: string;
  gradientColor1: string;
  gradientColor2: string;
  gradientAngle: number;
  gradientPercentage: number;
  onBackgroundStyleChange?: (style: 'solid' | 'gradient') => void;
  onSolidColorChange?: (color: string) => void;
  onGradientColor1Change?: (color: string) => void;
  onGradientColor2Change?: (color: string) => void;
  onGradientAngleChange?: (angle: number) => void;
  onGradientPercentageChange?: (percentage: number) => void;
}

const BackgroundSelector: React.FC<BackgroundControlProps> = ({
  backgroundStyle,
  solidColor,
  gradientColor1,
  gradientColor2,
  gradientAngle,
  gradientPercentage,
  onGradientPercentageChange = () => {},
  onBackgroundStyleChange = () => {},
  onSolidColorChange = () => {},
  onGradientColor1Change = () => {},
  onGradientColor2Change = () => {},
  onGradientAngleChange = () => {},
}) => {
  const titleColorsSwatches = useMemo(
    () => ['#FFFFFF', ...titleColors],
    [titleColors]
  );

  return (
    <Stack gap={16}>
      <SegmentedControl
        data={[
          { value: 'solid', label: 'Solid' },
          { value: 'gradient', label: 'Gradient' },
        ]}
        value={backgroundStyle}
        onChange={(value) => {
          onBackgroundStyleChange(value as 'solid' | 'gradient');
        }}
        fullWidth
      />
      {backgroundStyle === 'solid' ? (
        <InputWrapper
          label="Solid Color"
          description="Choose the background color"
        >
          <ColorPicker
            value={solidColor}
            onChange={onSolidColorChange}
            withPicker={false}
            format="hex"
            swatches={backgroundColors}
          />
        </InputWrapper>
      ) : (
        <>
          <InputWrapper label="Gradient Color 1">
            <ColorPicker
              value={gradientColor1}
              onChange={onGradientColor1Change}
              withPicker={false}
              format="hex"
              swatches={backgroundColors}
            />
          </InputWrapper>
          <InputWrapper label="Gradient Color 2">
            <ColorPicker
              value={gradientColor2}
              onChange={onGradientColor2Change}
              withPicker={false}
              format="hex"
              swatches={titleColorsSwatches}
            />
          </InputWrapper>
          <InputWrapper
            label="Gradient position"
            description="Choose the gradient position"
          >
            <Group style={{ width: '100%', marginBlockStart: 8 }}>
              <AngleSlider
                value={gradientAngle}
                onChange={(value) => onGradientAngleChange(value)}
                step={5}
              />
              <Slider
                label="Gradient Percentage"
                value={gradientPercentage}
                onChange={(value) => onGradientPercentageChange(value)}
                min={10}
                max={90}
                step={1}
                marks={[
                  { value: 10, label: '10%' },
                  { value: 50, label: '50%' },
                  { value: 90, label: '90%' },
                ]}
                styles={{
                  markLabel: {
                    fontSize: 12,
                    color: '#000',
                  },
                }}
              />
            </Group>
          </InputWrapper>
        </>
      )}
    </Stack>
  );
};

export default BackgroundSelector;
