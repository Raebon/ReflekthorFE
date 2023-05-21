import { Facebook, Instagram, Twitch, Twitter, Youtube } from "lucide-react";
import { FC } from "react";
import { config } from "@/config";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  const { socials, footerBlogName } = config;
  return (
    <div className="flex items-center justify-between">
      <div className="container max-w-5xl mx-auto w-full flex justify-between items-center text-slate-700 dark:text-slate-400 my-5 border-t pt-5">
        <small>{footerBlogName}</small>
        <div className="flex gap-2 items-center">
          <a href={socials.instagram} target="_blank">
            <Instagram className="w-4 hover:text-pink-600 hover:cursor-pointer" />
            <div className="w-4 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          </a>
          <a href={socials.twitter} target="_blank">
            <Twitter className="w-4 hover:text-sky-500 hover:cursor-pointer" />
            <div className="w-4 h-0.5 bg-sky-500"></div>
          </a>
          <a href={socials.facebook} target="_blank">
            <Facebook className="w-4 hover:text-blue-600 hover:cursor-pointer" />
            <div className="w-4 h-0.5 bg-blue-600"></div>
          </a>
          <a href={socials.twitch} target="_blank">
            <Twitch className="w-4 hover:text-indigo-500 hover:cursor-pointer" />
            <div className="w-4 h-0.5 bg-indigo-500"></div>
          </a>
          <a href={socials.youtube} target="_blank">
            <Youtube className="w-4 hover:text-red-500 hover:cursor-pointer hover:scale-105" />
            <div className="w-4 h-0.5 bg-red-500"></div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
