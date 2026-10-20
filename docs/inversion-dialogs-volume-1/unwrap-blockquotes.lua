-- Word's PDF import leaves a stray left-indent on paragraphs, which Pandoc's
-- docx reader interprets as a blockquote. This filter unwraps blockquotes
-- back into plain paragraphs so the Markdown output has no leading "> ".
function BlockQuote(el)
  return el.content
end
