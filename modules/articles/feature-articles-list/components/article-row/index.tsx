import { Article } from "../../../domain";

export function ArticleRow({ article }: { article: Article }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noreferrer"
      className="border border-zinc-700 bg-zinc-800 bg-opacity-30 hover:bg-opacity-100 transition-all duration-300 rounded-xl p-4 flex flex-col gap-4"
    >
      <h1 className="text-xl font-bold">{article.title}</h1>
      <div className="flex items-center justify-between text-zinc-400 overflow-auto">
        <span className="hidden md:block">{article.addedAt}</span>
        <ul className="flex gap-2">
          {article.tags.map((tag) => (
            <li
              className={`bg-blue-800 bg-opacity-50 text-white py-1 text-sm px-3 rounded-xl`}
              key={tag}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </a>
  );
}
