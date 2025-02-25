import { db } from '@/database/drizzle';
import { books } from '@/database/schema';
import React from 'react'
import { eq } from "drizzle-orm";
import { redirect } from 'next/navigation';
import BookOverview from '@/components/BookOverview';
import { auth } from '@/auth';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const session = await auth();

    const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);

    if(!bookDetails) redirect("/404");

  return <>
  <BookOverview {...bookDetails} userId={session?.user?.id as string} />
  </>
}

export default page