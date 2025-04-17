import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import {
  AppShell,
  Container,
  createTheme,
  Group,
  MantineProvider,
  Text,
  Stack,
  Switch,
  Title,
} from '@mantine/core';
import {
  useLocalStorage,
  useMediaQuery,
} from '@mantine/hooks';
import {
  IconCards,
  IconMoonStars,
  IconSun,
} from '@tabler/icons-react';
import NavigationLink from '../components/NavigationLink';

export const Route = createRootRoute({
  component: RootComponent,
});

const mantineDark = createTheme({
  primaryColor: 'cyan',
  fontFamily: 'Open Sans, sans-serif',
});

function RootComponent() {
  const isMobile = useMediaQuery('(max-width: 600px)');

  const [colorScheme, setColorScheme] = useLocalStorage<'light' | 'dark'>({
    key: 'color-scheme',
    defaultValue: 'light',
  });

  const toggleColorScheme = () =>
    setColorScheme((current) => (current === 'dark' ? 'light' : 'dark'));

  return (
    <React.Fragment>
      <MantineProvider
        theme={mantineDark}
        defaultColorScheme={'dark'}
        forceColorScheme={colorScheme}
      >
        <AppShell
          header={{ height: { base: 60, md: 70, lg: 80 } }}
          navbar={{ width: { sm: 180, lg: 250 }, breakpoint: 'sm' }}
          padding="md"
        >
          <AppShell.Header>
            <Group h="100%" px="md" justify="space-between" wrap="wrap">
              <Group>
                <IconCards size={30} />
                <Title order={2}>KB Component Docs</Title>
              </Group>
              <Group>
                <Switch
                  size="md"
                  color="dark.4"
                  checked={colorScheme === 'dark'}
                  onChange={toggleColorScheme}
                  onLabel={
                    <IconSun
                      size={16}
                      stroke={2.5}
                      color="var(--mantine-color-yellow-4)"
                    />
                  }
                  offLabel={
                    <IconMoonStars
                      size={16}
                      stroke={2.5}
                      color="var(--mantine-color-blue-6)"
                    />
                  }
                />
              </Group>
            </Group>
          </AppShell.Header>
          <AppShell.Navbar>
            <Stack gap={4}>
              <Text size="md" p="md">
                Components
              </Text>
              <NavigationLink
                label="Home"
                to="/"
              />
              <NavigationLink
                label="Accordion"
                to="/accordion"
              />
              <NavigationLink
                label="Alert"
                to="/alert"
              />
              <NavigationLink
                label="Action Avatar"
                to="/action-avatar"
              />
              <NavigationLink
                label="Badge"
                to="/badge"
              />
              <NavigationLink
                label="Banner"
                to="/banner"
              />
              <NavigationLink
                label="Paper"
                to="/paper"
              />
            </Stack>
          </AppShell.Navbar>
          <AppShell.Main>
            <Container size={isMobile ? 'sm' : 'md'}>
              <Outlet />
            </Container>
          </AppShell.Main>          
        </AppShell>
      </MantineProvider>
    </React.Fragment>
  );
}