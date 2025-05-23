import { markdownToHtml } from '@/lib/utils';
import React from 'react';

type Props = {
  markdownText: string;
};

const AiReportRender = ({ markdownText }: Props) => {
  // Remove the initial ```html and last ```
  const cleanedText = markdownText.replace(/^```html|```$/g, '').trim();

  // Convert the cleaned Markdown to HTML
  const html =  markdownToHtml(cleanedText);

  return (
    <div className="ai-report max-w-3xl" dangerouslySetInnerHTML={{ __html: html as any }} />
    
  );
};

export default AiReportRender;