"use client";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function MdxEditor({ value, onChange }: { value?: string; onChange: (v: string | undefined) => void }) {
  return <MDEditor value={value} onChange={onChange} height={400} />;
}