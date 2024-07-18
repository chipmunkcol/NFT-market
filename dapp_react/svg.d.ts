declare module "*.svg" {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
  // const src: string;
  // export default src;
}

declare module "vite-plugin-svgr/client" {
  export interface SvgrComponent
    extends React.FunctionComponent<React.SVGProps<SVGSVGElement>> {}

  const ReactComponent: SvgrComponent;
  export default ReactComponent;
}
