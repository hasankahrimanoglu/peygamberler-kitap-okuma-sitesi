import { redirect } from "next/navigation";

export default async function TestReaderRedirectPage({
  searchParams,
}: {
  searchParams: Promise<{ chapter?: string }>;
}) {
  const params = await searchParams;
  const requestedChapter = params.chapter;
  const allowedChapters = ["4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
  const chapterId =
    requestedChapter && allowedChapters.includes(requestedChapter)
      ? requestedChapter
      : "4";

  redirect(`/reader/${chapterId}`);
}
