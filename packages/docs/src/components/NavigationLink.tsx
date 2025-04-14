
// create functional component NavigationLink that extends the NavLink component from Mantine
import { NavLink, NavLinkProps } from '@mantine/core';
import { forwardRef } from 'react';
import { useMatch, useNavigate, LinkProps } from '@tanstack/react-router';

export interface NavigationLinkProps extends NavLinkProps {
  to: LinkProps['to'];
  search?: LinkProps['search'];
}

const NavigationLink = forwardRef<HTMLAnchorElement, NavigationLinkProps>(
  ({ to, ...props }, ref) => {
    const navigate = useNavigate();
    const active = useMatch({ from: to as any, shouldThrow: false });

    const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      navigate({ to });
    };

    return (
      <NavLink
        component="a"
        ref={ref}
        href={to}
        onClick={onClick}
        active={!!active}
        {...props}
      />
    );
  }
);

NavigationLink.displayName = 'NavigationLink';

export default NavigationLink;