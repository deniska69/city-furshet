const Icon = ({ name, color = "black", size }) => {
  if (name === "close") return <Close {...{ color, size }} />;
  if (name === "minus") return <Minus {...{ color, size }} />;
  if (name === "plus") return <Plus {...{ color, size }} />;
  return null;
};

export default Icon;

const Close = ({ color, size = 32 }) => (
  <svg height={`${size}px`} viewBox="0 0 512 512" width={`${size}px`} fill={color}>
    <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" />
  </svg>
);

const Minus = ({ color, size = 18 }) => (
  <svg height={`${size}px`} viewBox="0 0 512 512" width={`${size}px`} fill={color}>
    <path d="M417.4,224H94.6C77.7,224,64,238.3,64,256c0,17.7,13.7,32,30.6,32h322.8c16.9,0,30.6-14.3,30.6-32  C448,238.3,434.3,224,417.4,224z" />
  </svg>
);

const Plus = ({ color, size = 20 }) => (
  <svg height={`${size}px`} viewBox="0 0 512 512" width={`${size}px`} fill={color}>
    <path d="M417.4,224H288V94.6c0-16.9-14.3-30.6-32-30.6c-17.7,0-32,13.7-32,30.6V224H94.6C77.7,224,64,238.3,64,256  c0,17.7,13.7,32,30.6,32H224v129.4c0,16.9,14.3,30.6,32,30.6c17.7,0,32-13.7,32-30.6V288h129.4c16.9,0,30.6-14.3,30.6-32  C448,238.3,434.3,224,417.4,224z" />
  </svg>
);
