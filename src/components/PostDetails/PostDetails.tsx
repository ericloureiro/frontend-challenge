import { truncate } from "@/utils";
import {
  faEye,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { PostDetailsProps } from "./types";

export function PostDetails({ post, isNew, isPreview }: PostDetailsProps) {
  const { body, reactions, tags, title, userId, views } = post;

  const avatarSize = isPreview ? "40" : "80";
  const description = isPreview ? truncate(body) : body;

  return (
    <div
      className={`w-full md:max-w-2xl max-h-fit bg-neutral-900 border rounded-xl p-4 text-gray-200 
        ${isPreview && "hover:border-orange-500 hover:-translate-y-0.5 transition-all cursor-pointer"}  
        ${isNew ? "border-orange-500" : "border-zinc-900"}`}
    >
      <div className="flex items-center gap-3 mb-2">
        <Image
          src={`https://i.pravatar.cc/${avatarSize}?u=${userId}`}
          alt="avatar"
          width={avatarSize}
          height={avatarSize}
          className="rounded-full border-2 border-orange-500"
        />
        <span className="text-sm text-gray-400">User #{userId}</span>
      </div>

      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>

      <p className={`text-sm text-gray-300 mb-3 text-pretty`}>{description}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded-md bg-orange-500/10 text-orange-400"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between text-xs text-gray-400">
        <div className="flex gap-3">
          <span>
            <FontAwesomeIcon icon={faThumbsUp} /> {reactions.likes}
          </span>
          <span>
            <FontAwesomeIcon icon={faThumbsDown} /> {reactions.dislikes}
          </span>
        </div>
        <span>
          <FontAwesomeIcon icon={faEye} /> {views}
        </span>
      </div>
    </div>
  );
}
