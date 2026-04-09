"use client";

import { useState } from "react";

type Props = {
  onSearch: (value: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [value, setValue] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    setValue(input);
    onSearch(input);
  }

  return (
    <input
      type="text"
      placeholder="Search coin..."
      value={value}
      onChange={handleChange}
      className="w-full max-w-sm px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white outline-none focus:border-neutral-600"
    />
  );
}
