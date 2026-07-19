// Live Google reviews via the Places API (New). Fetched at BUILD TIME inside the
// server component, so reviews refresh on each deploy and no API key ever ships
// to the browser. Returns null on missing creds or any error — callers fall back
// to the curated static reviews, so the site never breaks.

export type GoogleReview = {
  author: string
  rating: number
  quote: string
  relativeTime: string
}

export type GoogleReviewsData = {
  rating: number
  total: number
  reviews: GoogleReview[]
  mapsUri: string
}

export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID
  if (!key || !placeId) return null

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'rating,userRatingCount,reviews,googleMapsUri',
      },
      // Build-time fetch; cache so repeated builds in one session don't re-hit the API.
      cache: 'force-cache',
    })
    if (!res.ok) {
      console.warn('Google reviews fetch failed:', res.status, await res.text())
      return null
    }
    const data = (await res.json()) as {
      rating?: number
      userRatingCount?: number
      googleMapsUri?: string
      reviews?: Array<{
        rating?: number
        text?: { text?: string }
        originalText?: { text?: string }
        authorAttribution?: { displayName?: string }
        relativePublishTimeDescription?: string
      }>
    }

    const reviews: GoogleReview[] = (data.reviews ?? [])
      .map((r) => ({
        author: r.authorAttribution?.displayName?.trim() || 'Google guest',
        rating: Math.round(r.rating ?? 5),
        quote: (r.text?.text ?? r.originalText?.text ?? '').trim(),
        relativeTime: r.relativePublishTimeDescription?.trim() || '',
      }))
      .filter((r) => r.quote.length > 0)

    if (reviews.length === 0 && !data.rating) return null

    return {
      rating: data.rating ?? 0,
      total: data.userRatingCount ?? 0,
      reviews,
      mapsUri: data.googleMapsUri ?? '',
    }
  } catch (e) {
    console.warn('Google reviews error:', e instanceof Error ? e.message : e)
    return null
  }
}
