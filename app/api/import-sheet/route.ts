import { NextRequest, NextResponse } from 'next/server';
import Papa from 'papaparse';

// Extracts the spreadsheet ID and (optional) gid (tab id) from any of the
// common Google Sheets URL formats a user might paste in, e.g.:
//   https://docs.google.com/spreadsheets/d/1AbCдефID/edit#gid=123456
//   https://docs.google.com/spreadsheets/d/1AbCдефID/edit?usp=sharing
function extractSheetInfo(url: string): { id: string; gid: string } | null {
  const idMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (!idMatch) return null;

  const gidMatch = url.match(/[?#&]gid=([0-9]+)/);
  return { id: idMatch[1], gid: gidMatch ? gidMatch[1] : '0' };
}

export async function POST(req: NextRequest) {
  let body: { url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const url = body.url?.trim();
  if (!url) {
    return NextResponse.json({ error: 'Missing Google Sheet URL' }, { status: 400 });
  }

  const info = extractSheetInfo(url);
  if (!info) {
    return NextResponse.json({ error: 'Could not parse that Google Sheets URL' }, { status: 400 });
  }

  const csvUrl = `https://docs.google.com/spreadsheets/d/${info.id}/export?format=csv&gid=${info.gid}`;

  let csvText: string;
  try {
    const res = await fetch(csvUrl);
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Could not read the sheet. Make sure it\'s shared as "Anyone with the link can view".' },
        { status: 400 }
      );
    }
    csvText = await res.text();
  } catch {
    return NextResponse.json({ error: 'Failed to reach Google Sheets' }, { status: 502 });
  }

  const parsed = Papa.parse<Record<string, string>>(csvText.trim(), {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });

  return NextResponse.json({ rows: parsed.data });
}