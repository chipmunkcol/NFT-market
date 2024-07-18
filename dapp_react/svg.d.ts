declare module "*.svg" {
  import React from "react";
  const content: React.FC<React.SVGProps<SVGAElement>>;
  export default content;
  // const src: string;
  // export default src;
}
