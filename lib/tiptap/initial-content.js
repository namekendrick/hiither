export const initialContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        level: 1,
        textAlign: "left",
      },
      content: [
        { type: "emoji", attrs: { name: "sparkles" } },
        { text: " Getting Started ", type: "text" },
        { type: "emoji", attrs: { name: "sparkles" } },
      ],
    },
    {
      type: "paragraph",
      attrs: { class: null, textAlign: "left" },
      content: [
        {
          text: "If you’re reading this, congrats! You’ve likely realized two very important things:",
          type: "text",
        },
      ],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { class: null, textAlign: "left" },
              content: [
                {
                  text: "Popups were cool 10 years ago. Now they’re just annoying.",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { class: null, textAlign: "left" },
              content: [
                { text: "People want to be spoken ", type: "text" },
                { text: "with", type: "text", marks: [{ type: "italic" }] },
                { text: ", not spoken at.", type: "text" },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "imageBlock",
      attrs: {
        src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDlmbWo5ZmtxcWJ6c29hbW45aTJsMnhtbHNpb2Vsc3U5ZDk3OHF6dSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzdYJK1wAdPWVk88/giphy.gif",
        align: "center",
        width: "100%",
      },
    },
    {
      type: "paragraph",
      attrs: { class: null, textAlign: "left" },
      content: [
        {
          text: "Instead of hyperlinking to another page, guide, report, etc., include an ecxerpt of that content here and have the link trigger this panel - try starting with a high-traffic page.",
          type: "text",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: { class: null, textAlign: "left" },
      content: [
        {
          text: "Follow the steps below and watch your subscriber list fill up with ",
          type: "text",
        },
        {
          text: "genuinely engaged people",
          type: "text",
          marks: [{ type: "bold" }],
        },
        {
          text: ":",
          type: "text",
          marks: [
            {
              type: "textStyle",
              attrs: { color: "#2a4bef", fontSize: null, fontFamily: null },
            },
          ],
        },
      ],
    },
    {
      type: "orderedList",
      attrs: { start: 1 },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { class: null, textAlign: "left" },
              content: [
                {
                  text: "Somewhere in this panel, ask a genuine, thought-provoking question like ",
                  type: "text",
                },
                {
                  text: "What’s the better fall destination; the beach or the mountains? ",
                  type: "text",
                  marks: [{ type: "italic" }],
                },
                {
                  text: "(Hint: polarizing questions like this work really well!)",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { class: null, textAlign: "left" },
              content: [
                { text: "When you’re done,", type: "text" },
                { text: " Publish", type: "text", marks: [{ type: "bold" }] },
                { text: " this panel, ", type: "text" },
                { text: "copy", type: "text", marks: [{ type: "bold" }] },
                { text: " the href id, and ", type: "text" },
                { text: "replace", type: "text", marks: [{ type: "bold" }] },
                {
                  text: " the old href value for any link(s) you choose. For example: ",
                  type: "text",
                },
                {
                  text: "<a href=”#hii-123456”>Fall Guide</a>",
                  type: "text",
                  marks: [{ type: "highlight", attrs: { color: "#eaeaea" } }],
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { class: null, textAlign: "left" },
              content: [
                {
                  text: "Visitors who want to participate in the discussion will be asked for their email address which you can then ",
                  type: "text",
                },
                { text: "export", type: "text", marks: [{ type: "bold" }] },
                { text: " from your workspace.", type: "text" },
              ],
            },
          ],
        },
      ],
    },
    { type: "paragraph", attrs: { class: null, textAlign: "left" } },
  ],
};
