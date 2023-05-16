import { FC } from "react";

interface BlogContentComponentProps {
  content: string;
}

const BlogContentComponent: FC<BlogContentComponentProps> = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default BlogContentComponent;
