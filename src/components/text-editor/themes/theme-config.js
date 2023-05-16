const exampleTheme = {
  ltr: "ltr",
  rtl: "rtl",
  placeholder:
    "overflow-hidden absolute text-ellipsis top-[15px] left-[10px] text-sm select-none inline-block pointer-events-none",
  paragraph: "relative m-0 mb-[8px] last:mb-0",
  quote:
    "m-0 ml-[20px] text-lg text-[#676b65] border-l-4 border-[#ced0d4] pl-[16px]",
  heading: {
    h1: "text-2xl font-normal m-0 mb-[12px] p-0",
    h2: "text-base font-bold m-0 mt-[10px] p-0 uppercase",
    h3: "editor-heading-h3", //todo
    h4: "editor-heading-h4", //todo
    h5: "editor-heading-h5", //todo
  },
  list: {
    nested: {
      listitem: "list-none",
    },
    ol: "p-0 m-0 ml-[16px]",
    ul: "p-0 m-0 ml-[16px]",
    listitem: "my-[8px] mx-[32px]",
  },
  image: "editor-image",
  link: "hover:underline text-blue-600 dark:text-cyan-400",
  text: {
    bold: "font-bold",
    italic: "italic",
    overflowed: "editor-text-overflowed",
    hashtag: "editor-text-hashtag",
    underline: "underline ",
    strikethrough: "line-through",
    underlineStrikethrough: "underline line-through",
    code: "editor-text-code",
  },
  code: "editor-code",
  codeHighlight: {
    atrule: "editor-tokenAttr",
    attr: "editor-tokenAttr",
    boolean: "editor-tokenProperty",
    builtin: "editor-tokenSelector",
    cdata: "editor-tokenComment",
    char: "editor-tokenSelector",
    class: "editor-tokenFunction",
    "class-name": "editor-tokenFunction",
    comment: "editor-tokenComment",
    constant: "editor-tokenProperty",
    deleted: "editor-tokenProperty",
    doctype: "editor-tokenComment",
    entity: "editor-tokenOperator",
    function: "editor-tokenFunction",
    important: "editor-tokenVariable",
    inserted: "editor-tokenSelector",
    keyword: "editor-tokenAttr",
    namespace: "editor-tokenVariable",
    number: "editor-tokenProperty",
    operator: "editor-tokenOperator",
    prolog: "editor-tokenComment",
    property: "editor-tokenProperty",
    punctuation: "editor-tokenPunctuation",
    regex: "editor-tokenVariable",
    selector: "editor-tokenSelector",
    string: "editor-tokenSelector",
    symbol: "editor-tokenProperty",
    tag: "editor-tokenProperty",
    url: "editor-tokenOperator",
    variable: "editor-tokenVariable",
  },
};

export default exampleTheme;
