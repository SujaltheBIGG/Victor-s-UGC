// The landing page at / is served by middleware.js, which rewrites to the
// static marketing document in public/marketing. This route only runs if that
// rewrite is bypassed, so send people to the studio rather than 404.
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/studio');
}
