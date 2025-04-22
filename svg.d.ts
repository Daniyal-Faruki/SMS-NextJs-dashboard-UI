// types/svg.d.ts or just svg.d.ts at project root
declare module "*.svg" {
    import * as React from "react";
  
    const content: React.FC<React.SVGProps<SVGSVGElement>>;
    export default content;
  }
  