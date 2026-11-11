import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// POST - Create a new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = [
      'title', 'description', 'fullDescription', 'image',
      'startDate', 'endDate', 'location', 'discount'
    ]
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Validate dates
    const startDate = new Date(body.startDate)
    const endDate = new Date(body.endDate)
    
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      )
    }
    
    if (endDate < startDate) {
      return NextResponse.json(
        { error: 'End date must be after start date' },
        { status: 400 }
      )
    }

    const now = new Date().toISOString()

    // Insert event into Supabase
    const { data: event, error } = await supabase
      .from('Events')
      .insert([
        {
          title: body.title,
          description: body.description,
          fullDescription: body.fullDescription,
          image: body.image,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          location: body.location,
          discount: body.discount,
          isActive: body.isActive ?? true,
          createdAt: now,
          updatedAt: now
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to create event',
          details: error.message
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Event created successfully',
        data: event 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to create event',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// GET - Get all events
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const isActive = searchParams.get('isActive')
    
    let query = supabase
      .from('Events')
      .select('*')
      .order('startDate', { ascending: true })

    // Apply filter if provided
    if (isActive !== null && isActive !== 'all') {
      query = query.eq('isActive', isActive === 'true')
    }

    const { data: events, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to fetch events',
          details: error.message
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true,
        data: events 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch events' 
      },
      { status: 500 }
    )
  }
}