interface ImageValue {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
}

declare module '*.png' {
  const value: ImageValue;
  export default value;
}

declare module '*.jpg' {
  const value: ImageValue;
  export default value;
}

declare module '*.jpeg' {
  const value: ImageValue;
  export default value;
}

declare module '*.gif' {
  const value: ImageValue;
  export default value;
}

declare module '*.webp' {
  const value: ImageValue;
  export default value;
}

declare module '*.svg' {
  const value: FC<SVGAttributes<SVGElement>>;
  export default value;
}
