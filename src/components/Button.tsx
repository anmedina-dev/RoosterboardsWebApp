import React from "react";

type ButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  content: string;
};

export default function Button({ onClick, content }: ButtonProps) {
  return (
    <button onClick={onClick} className="btn btn-secondary">
      {content}
    </button>
  );
}
