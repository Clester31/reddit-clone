import { NextRequest, NextResponse } from 'next/server';
import { postdb } from "@/postdb";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    const filteredPost = query 
        ? postdb.filter(post => post.id === query) 
        : postdb;
    return NextResponse.json(filteredPost);
}
