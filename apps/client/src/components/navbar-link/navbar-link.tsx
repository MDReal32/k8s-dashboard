import { FC, useCallback, useMemo } from "react";
import { Link, useMatches } from "react-router-dom";

import { routeBuilder } from "../../routes";
import { Navbar } from "../navbar";

interface NavbarLinkProps {
  paths: string[];
  updateName?(name: string): string;
  updateVariable?(variable: string): string;
}

const convertPathToRegex = (path: string) => {
  const regex = path.replace(/\/:([^/]+)/g, "/(?<$1>[^/]+)");
  return new RegExp(`^${regex}$`);
};

export const NavbarLink: FC<NavbarLinkProps> = ({
  paths,
  updateName = name => name,
  updateVariable = variable => variable
}) => {
  const path = useMemo(() => paths[0], [paths]);
  const matches = useMatches();

  const routePath = useMemo(() => routeBuilder.getRoutePath(path), [path]);
  const params = useMemo(() => matches.at(-1)?.params || {}, [matches]);
  const matchedPath = useMemo(() => {
    for (let path of paths) {
      if (convertPathToRegex(path).test(matches.at(-1)?.pathname || "")) return path;
    }
    return null;
  }, [matches, paths]);
  const matchedRouteObject = useMemo(
    () => (matchedPath ? routeBuilder.getRoutePath(matchedPath) : null),
    [matchedPath]
  );

  const updateVariables = useCallback(
    (name?: string) => {
      if (!name) return "";
      Object.entries(params).forEach(([key, value]) => {
        name = name!.replace(`:${key}`, value ? updateVariable(value) : `:${key}`);
      });
      return name;
    },
    [params]
  );

  return (
    <Navbar.Link as={Link} to={routePath.path || "/"} active={!!matchedPath}>
      {updateName(updateVariables((matchedRouteObject || routePath).id))}
    </Navbar.Link>
  );
};
